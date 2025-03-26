import { Controller } from '@nestjs/common';
import { MasterUserService } from './user.service';

@Controller()
export class MasterUserController {
	constructor(private readonly masterUserService: MasterUserService) {}
}
