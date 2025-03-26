import { Module } from '@nestjs/common';
import { MasterUserModule } from './user/user.module';
import { MasterVersionModule } from './version/version.module';

@Module({
	imports: [MasterUserModule, MasterVersionModule],
})
export class MasterModule {}
