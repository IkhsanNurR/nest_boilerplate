import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { PrismaService } from '@db_service';

@Module({
	controllers: [ExampleController],
	providers: [ExampleService, PrismaService],
})
export class ExampleModule {}
