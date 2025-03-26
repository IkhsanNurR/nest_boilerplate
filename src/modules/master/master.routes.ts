import { MasterUserModule } from './user/user.module';
import { MasterVersionModule } from './version/version.module';

export const masterRoutes = [
	{
		path: 'user',
		module: MasterUserModule,
	},
	{
		path: 'version',
		module: MasterVersionModule,
	},
];
