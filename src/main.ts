import 'dotenv/config'; // Pastikan ini ada di bagian atas
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { PORT_NEST } from './common/env/env.config';
import * as express from 'express';
import helmet from 'helmet';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { LoggingMiddleware } from './common/middlewares/logging.middlewares';
import { LoggingInterceptor } from './common/logger/logging.interceptor';
import { processValidationChildren } from './common/exception_filter/exception_filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// Matikan semua log bawaan NestJS
	Logger.overrideLogger([]);
	// eslint-disable-next-line @typescript-eslint/unbound-method
	app.use(new LoggingMiddleware().use);

	//validator
	app.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: false, // Opsional: Atur ke true jika ingin error berhenti pada kesalahan pertama
			transform: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const messages: string[] = [];
				console.log(errors);
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
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(helmet());
	app.enableCors({
		origin: ['*'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	});

	await app.listen(PORT_NEST ?? 3000);
	console.log(`🚀 Server running on http://localhost:${PORT_NEST ?? 3000}`);
}
//@typescript-eslint/no-floating-promises
void bootstrap();
