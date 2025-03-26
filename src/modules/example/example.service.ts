import { Injectable } from '@nestjs/common';
import { generatePDF } from 'src/common/file/generate_pdf';
import { PostPDFDto } from './dto/get_pdf.dto';

@Injectable()
export class ExampleService {
	async postPDF(body: PostPDFDto): Promise<Buffer | object> {
		try {
			return await generatePDF({ html: body.html });
		} catch (error) {
			throw error;
		}
	}
}
