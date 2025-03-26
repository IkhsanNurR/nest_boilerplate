import { Module } from '@nestjs/common';
import { MasterUserController } from './user.controller';
import { MasterUserService } from './user.service';

@Module({
	controllers: [MasterUserController],
	providers: [MasterUserService],
})
export class MasterUserModule {}
