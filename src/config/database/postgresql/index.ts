import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from 'models/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async executeSelectQuery<T>(query: string, ...values: any[]): Promise<T> {
		return await this.$queryRaw<T>(Prisma.sql([query, ...values]));
	}

	async executeSelectOneQuery<T>(query: string, ...values: any[]): Promise<T> {
		const res = await this.$queryRaw<T>(Prisma.sql([query, ...values]));
		return res[0];
	}
}
