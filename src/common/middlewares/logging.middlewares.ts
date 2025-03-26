import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/winston_logger';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const { method, url } = req;
		const start = Date.now();

		res.on('finish', () => {
			const duration = Date.now() - start;
			const logMessage = JSON.stringify({
				method,
				url,
				status: res.statusCode,
				duration: `${duration}ms`,
				status_check: `🚀 Received Request`,
			});

			logger.log('info', logMessage);
		});

		next();
	}
}
