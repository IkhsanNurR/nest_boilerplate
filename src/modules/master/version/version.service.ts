import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterVersionService {
	getHello(): string {
		try {
			return 'HEHE';
		} catch (error) {
			throw error;
		}
	}
}
