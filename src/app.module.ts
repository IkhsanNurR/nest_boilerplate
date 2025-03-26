import { Module } from '@nestjs/common';
import { MasterModule } from './modules/master/master.module';
import { RouterModule } from '@nestjs/core';
import { masterRoutes } from './modules/master/master.routes';
import { ExampleModule } from './modules/example/example.module';
import { exampleRoutes } from './modules/example/example.routes';

@Module({
	imports: [
		MasterModule,
		ExampleModule,
		RouterModule.register([
			{
				path: 'master',
				module: MasterModule,
				children: masterRoutes,
			},
			{
				path: 'example',
				module: ExampleModule,
				children: exampleRoutes,
			},
		]),
	],
})
export class AppModule {}
