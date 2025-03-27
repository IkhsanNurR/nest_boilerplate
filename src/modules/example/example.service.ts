import { Injectable } from '@nestjs/common';
import { generatePDF } from 'src/common/file/generate_pdf';
import { PostPDFDto } from './dto/get_pdf.dto';
import { socket } from '@socket_service';
import socket_client from '@socket_client_service';
import { DeleteResponseDto, GetByIdResponseDto, GetListResponseDto, PostResponseDto } from 'src/common/response/response.type';
import { GetByIdParamDto, GetListQueryDto } from './dto/get_by_id.dto';
import { DeleteByIdParamDto, DeleteByIdQueryDto } from './dto/delete.dto';
@Injectable()
export class ExampleService {
	async postPDF(body: PostPDFDto): Promise<Buffer | object> {
		try {
			return await generatePDF({ html: body.html });
		} catch (error) {
			throw error;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async socketServer(body: any): Promise<PostResponseDto> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			console.log({ body });
			await socket.emitMessage('test', 'test');
			return {
				data: null,
				message: 'success',
				statusCode: 200,
			};
		} catch (error) {
			throw error;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async socketClient(body: any): Promise<PostResponseDto> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			console.log({ body });
			socket_client.sendMessage('test', 'test');
			return {
				data: null,
				message: 'success',
				statusCode: 200,
			};
		} catch (error) {
			throw error;
		}
	}

	async getByIdParam(param: GetByIdParamDto): Promise<GetByIdResponseDto> {
		try {
			return {
				statusCode: 200,
				data: {
					test: 'test',
					id: param.id,
				},
				message: 'success',
			};
		} catch (error) {
			throw error;
		}
	}

	async getByListQuery(query: GetListQueryDto): Promise<GetListResponseDto> {
		try {
			return {
				statusCode: 200,
				data: [],
				message: 'success',
				meta_data: {
					limit: query.limit as number,
					page: query.page as number,
					total: 10,
				},
			};
		} catch (error) {
			throw error;
		}
	}

	async deleteByIdParam(param: DeleteByIdParamDto): Promise<DeleteResponseDto> {
		try {
			return {
				statusCode: 200,
				data: {
					test: 'test',
					id: param.id,
				},
				message: 'success',
			};
		} catch (error) {
			throw error;
		}
	}

	async deleteByQuery(query: DeleteByIdQueryDto): Promise<DeleteResponseDto> {
		try {
			return {
				statusCode: 200,
				data: {
					test: 'test',
					id: query.id,
				},
				message: 'success',
			};
		} catch (error) {
			throw error;
		}
	}
}
