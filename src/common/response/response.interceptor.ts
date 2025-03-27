import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { APP_ENV } from '../env/env.config';
import { BaseResponseDto } from './response.type';

export type ErrorResponse<T> = {
	statusCode: number;
	message: string;
	data: T;
	timestamp: string;
	error: string;
	curl?: string;
};

@Injectable()
//prettier-ignore
export class ErrorResponseInterceptor<T> implements NestInterceptor<T, ErrorResponse<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<ErrorResponse<T>> {
		return next.handle().pipe(catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))));
	}

	errorHandler(exception: HttpException, context: ExecutionContext) {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		const curlCommand = this.generateCurl(request);
		response.setHeader('Content-Type', 'application/json');
		response.removeHeader('Content-Disposition');
		let responses: BaseResponseDto = {
			statusCode: status,
			message: exception.message,
			timestamp: moment().toISOString(),
			error: exception.getResponse(),
			curl: (APP_ENV ?? 'DEV') === 'DEV' ? curlCommand : undefined,
		};
		let exception_response = exception?.getResponse();
		if (exception_response && typeof exception_response === 'object' && (exception_response as any).error === 'Validation Failed') {
			responses['curl'] = undefined;
		}
		response.status(status).json(responses);
	}

	private generateCurl(request: any): string {
		// Basic request info
		const method = request.method.toUpperCase();
		const url = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

		// Start building the curl command
		let curlCommand = `curl --location '${url}' --request ${method}`;

		// Add headers (simplified)
		if (request.headers) {
			Object.entries(request.headers)
				.filter(([key]) => !['host', 'connection', 'content-length', 'postman-token'].includes(key.toLowerCase()))
				.forEach(([key, value]) => {
					curlCommand += ` \\\n --header '${key}: ${String(value).replace(/'/g, "\\'")}'`;
				});
		}

		// Handle body - simplified approach
		if (method !== 'GET' && method !== 'HEAD') {
			// Try to get the raw body first
			let bodyData: string | null = null;

			// Check if body exists and has content
			if (request.body && Object.keys(request.body).length > 0) {
				if (typeof request.body === 'string') {
					bodyData = request.body;
				} else if (typeof request.body === 'object') {
					try {
						bodyData = JSON.stringify(request.body);
					} catch (e) {
						console.error('Error stringifying body:', e);
					}
				}
			}
			// If no body found in the usual place, check other common locations
			else if (request.rawBody) {
				bodyData = typeof request.rawBody === 'string' ? request.rawBody : request.rawBody.toString();
			}

			// Add body to curl command if we found it
			if (bodyData) {
				// Escape single quotes in the body
				const escapedBody = bodyData.replace(/'/g, "'\\''");
				curlCommand += ` \\\n --data "${escapedBody}"`;
			}

			// If we couldn't find a body but it's a POST/PUT/PATCH, add an empty data parameter
			// This is sometimes needed for certain APIs
			else if (['POST', 'PUT', 'PATCH'].includes(method)) {
				curlCommand += ` \\\n --data "{}"`;
			}
		}

		return curlCommand;
	}
}
