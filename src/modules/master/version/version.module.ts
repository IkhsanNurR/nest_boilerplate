import { Module } from '@nestjs/common';
import { MasterVersionController } from './version.controller';
import { MasterVersionService } from './version.service';

@Module({
	controllers: [MasterVersionController],
	providers: [MasterVersionService],
})
export class MasterVersionModule {}
