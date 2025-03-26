import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const ansi_color = {
	GET: '\e[0;32m',
	POST: '\x1B[33m',
	DELETE: '\x1B[36m',
	PUT: '\x1B[36m',
	PATCH: '\x1b[37m', // Perbaikan: menghilangkan escape yang tidak perlu
};

interface LogData {
	method: string;
	status_check: string;
	url: string;
	duration: number;
	status: number;
}

interface LogMessage {
	level: string;
	message: string | unknown;
	timestamp: string | unknown;
	context?: string | unknown; // Context bisa saja tidak ada
}

function formatLog(log: LogMessage): string {
	if (log && log.context && typeof log.context === 'string') {
		try {
			const logData: LogData = JSON.parse(log.context);
			return `${ansi_color[logData.method as keyof typeof ansi_color]} ${logData.status_check} | ${logData.method} - ${logData.url} - ${logData.duration} - ${logData.status} - ${log.timestamp} \x1b[0m`;
		} catch (e) {
			// Perbaikan: beri nama variabel catch
			return `Invalid JSON log message: ${log.context} - ${log.timestamp}`;
		}
	} else if (log && log.context) {
		return `Log message is not a string: ${log.context} - ${log.timestamp}`;
	} else {
		return `Log message context is missing: ${log.timestamp}`;
	}
}

const logger = WinstonModule.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({ all: true }),
				winston.format.timestamp(),
				winston.format.json(),
				winston.format.printf(({ level, message, timestamp, context }) => {
					return formatLog({ level, message, timestamp, context });
				}),
			),
		}),
	],
});

export { logger };
