import { IsNotEmpty, IsString } from 'class-validator';

export class PostPDFDto {
	@IsString()
	@IsNotEmpty()
	html: string;
}
