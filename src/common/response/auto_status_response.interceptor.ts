import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AutoStatusInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((response) => {
				const http = context.switchToHttp();
				const res = http.getResponse();

				if (!response?.statusCode) {
					return response;
				}

				res.status(response.statusCode); // Atur status sesuai response

				return response;
			}),
		);
	}
}
