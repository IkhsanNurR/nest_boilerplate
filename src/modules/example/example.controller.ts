import { Body, Controller, Delete, Get, Header, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Response } from 'express';
import { PostPDFDto } from './dto/get_pdf.dto';
import { DeleteResponseDto, GetByIdResponseDto, GetListResponseDto, PostResponseDto } from 'src/common/response/response.type';
import { GetByIdParamDto, GetListQueryDto } from './dto/get_by_id.dto';
import { DeleteByIdParamDto, DeleteByIdQueryDto } from './dto/delete.dto';
@Controller()
export class ExampleController {
	constructor(private readonly exampleService: ExampleService) {}

	// khusus response file, maka harus begini ya
	@Post('/pdf')
	@Header('Content-Type', 'application/pdf') // Set header Content-Type
	@Header('Content-Disposition', 'attachment; filename=laporan.pdf') // Set header untuk download
	async postPDF(@Body() body: PostPDFDto, @Res() res: Response): Promise<void> {
		try {
			const buffer = await this.exampleService.postPDF(body);

			if (Buffer.isBuffer(buffer)) {
				res.setHeader('Content-Length', buffer.length); // Set ukuran file
			}
			res.status(HttpStatus.OK).send(buffer); // Kirim PDF sebagai response
		} catch (error) {
			console.log(error);
			res.setHeader('Content-Type', 'application/json');
			throw error;
		}
	}

	@Post('/socket-server')
	async socketServer(@Body() body: any): Promise<PostResponseDto> {
		try {
			const res: PostResponseDto = await this.exampleService.socketServer(body);
			return res;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	@Post('/socket-client')
	async socketClient(@Body() body: any): Promise<PostResponseDto> {
		try {
			const res: PostResponseDto = await this.exampleService.socketClient(body);
			return res;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	@Get('/get-by-id/:id')
	async getById(@Param() params: GetByIdParamDto): Promise<GetByIdResponseDto> {
		try {
			console.log({ params });
			const res: GetByIdResponseDto = await this.exampleService.getByIdParam(params);
			return res;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	@Get('/list-filter')
	async getList(@Query() query: GetListQueryDto): Promise<GetListResponseDto> {
		try {
			console.log({ query });
			const res: GetListResponseDto = await this.exampleService.getByListQuery(query);
			return res;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	@Delete('/delete/:id')
	async deleteById(@Param() params: DeleteByIdParamDto): Promise<DeleteResponseDto> {
		try {
			console.log({ params });
			const res: DeleteResponseDto = await this.exampleService.deleteByIdParam(params);
			return res;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async deleteByQuery(@Query() query: DeleteByIdQueryDto): Promise<DeleteResponseDto> {
		try {
			console.log({ query });
			const res: DeleteResponseDto = await this.exampleService.deleteByQuery(query);
			return res;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
