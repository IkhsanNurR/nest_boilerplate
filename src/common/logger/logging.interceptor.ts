import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { logger } from './winston_logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest();
		const { method, url } = req;
		const start = Date.now();

		return next.handle().pipe(
			catchError((error) => {
				const duration = Date.now() - start;
				const logMessage = JSON.stringify({
					method,
					url,
					duration: `${duration}ms`,
					status: context.switchToHttp().getResponse().statusCode,
					error: error.message,
					status_check: `❌ Error`,
				});

				logger.log('error', logMessage);
				throw error;
			}),
		);
	}
}
