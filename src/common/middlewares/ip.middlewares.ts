import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface CustomRequest extends Request {
	clientIp?: string;
}

@Injectable()
export class IpInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req: CustomRequest = context.switchToHttp().getRequest();
		req.clientIp = req?.ip; // Get the IP address and attach it to req.clientIp

		// Optionally, you can attach it to the generic req object as well
		req['clientIpAddress'] = req.clientIp;

		return next.handle();
	}
}
