import 'dotenv/config'; // Pastikan ini ada di bagian atas
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorResponseInterceptor } from './common/response/response.interceptor';
import { PORT_NEST, KEY } from '@config_env';
import * as express from 'express';
import helmet from 'helmet';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { LoggingMiddleware } from './common/middlewares/logging.middlewares';
import { LoggingInterceptor } from './common/logger/logging.interceptor';
import { processValidationChildren } from './common/exception_filter/exception_filter';
import { CLIENT_1, CLIENT_2 } from './config/redis';
import * as SESSION from 'express-session';
import * as REDIS_STORE from 'connect-redis';
import getSocketWebInstance from './config/socket';
import * as HTTP from 'http';
import { AutoStatusInterceptor } from './common/response/auto_status_response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const httpServer: HTTP.Server = app.getHttpAdapter().getHttpServer();
	// Matikan semua log bawaan NestJS
	Logger.overrideLogger([]);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	app.use(new LoggingMiddleware().use);

	// class-validator
	app.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: false, // Opsional: Atur ke true jika ingin error berhenti pada kesalahan pertama
			transform: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const messages: string[] = [];
				errors.forEach((error) => {
					if (error.constraints) {
						messages.push(`${error.property} - ${Object.values(error.constraints).join(', ')}`);
					}
					if (error.children && error.children.length > 0) {
						const childMessages = processValidationChildren(error.children, error.property);
						messages.push(...childMessages);
					}
				});

				const response = {
					statusCode: 400,
					message: messages.join(', '),
					error: 'Validation Failed',
					details: errors,
				};
				return new BadRequestException(response);
			},
		}),
	);

	// Global Interceptor untuk format response error
	app.useGlobalInterceptors(new ErrorResponseInterceptor());
	app.useGlobalInterceptors(new AutoStatusInterceptor());
	app.useGlobalInterceptors(new LoggingInterceptor());

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		helmet({
			xXssProtection: true,
			xDownloadOptions: true,
		}),
	);

	const store = new REDIS_STORE.RedisStore({ client: CLIENT_1 });

	app.use(
		SESSION({
			store,
			secret: KEY,
			resave: false,
			saveUninitialized: false,
			cookie: { secure: false }, // Set secure: true in production
		}),
	);
	app.enableCors({
		origin: ['*'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	});
	await Promise.all([CLIENT_1, CLIENT_2])
		.then(async () => {
			console.log('Redis clients connected. Initializing WebSocket...');
			await getSocketWebInstance(httpServer);
		})
		.catch((error) => {
			console.error('Failed to connect to Redis:', error);
			// Handle error appropriately, maybe exit the application
		});
	await app.listen(PORT_NEST ?? 3000);
	console.log(`🚀 Server running on http://localhost:${PORT_NEST ?? 3000}`);
}
//@typescript-eslint/no-floating-promises
void bootstrap();
