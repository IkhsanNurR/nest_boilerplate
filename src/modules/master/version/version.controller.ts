import { Body, Controller, Delete, Get } from '@nestjs/common';
import { MasterVersionService } from './version.service';

@Controller()
export class MasterVersionController {
	constructor(private readonly masterVersionService: MasterVersionService) {}

	@Delete()
	getHello(@Body() body: any): string {
		return this.masterVersionService.getHello();
	}

	@Get()
	getList(@Body() body: any): string {
		return this.masterVersionService.getHello();
	}
}
