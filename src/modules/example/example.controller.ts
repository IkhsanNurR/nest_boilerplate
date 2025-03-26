import { Body, Controller, Header, HttpStatus, Post, Res } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Response } from 'express';
import { PostPDFDto } from './dto/get_pdf.dto';
@Controller()
export class ExampleController {
	constructor(private readonly exampleService: ExampleService) {}

	@Post()
	@Header('Content-Type', 'application/pdf') // Set header Content-Type
	@Header('Content-Disposition', 'attachment; filename=laporan.pdf') // Set header untuk download
	async postPDF(@Body() body: PostPDFDto, @Res() res: Response): Promise<void> {
		try {
			const buffer = await this.exampleService.postPDF(body);

			res.setHeader('Content-Length', buffer.length); // Set ukuran file
			res.status(HttpStatus.OK).send(buffer); // Kirim PDF sebagai response
		} catch (error) {
			console.log(error);
			res.setHeader('Content-Type', 'application/json');
			throw error;
		}
	}
}
