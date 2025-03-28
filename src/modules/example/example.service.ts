import { Injectable, NotFoundException } from '@nestjs/common';
import { generatePDF } from 'src/common/file/generate_pdf';
import { PostPDFDto } from './dto/get_pdf.dto';
import { socket } from '@socket_service';
import socket_client from '@socket_client_service';
import { DeleteResponseDto, GetByIdResponseDto, GetListResponseDto, PostResponseDto } from 'src/common/response/response.type';
import { GetByIdParamDto, GetListQueryDto } from './dto/get_by_id.dto';
import { DeleteByIdParamDto, DeleteByIdQueryDto } from './dto/delete.dto';
import { PrismaService } from '@db_service';
import { HTTP_STATUS_CODE } from 'src/common/response/http_status_code';
import { CrudAddition } from '@crud_helper';

@Injectable()
export class ExampleService {
	constructor(private prisma: PrismaService) {}
	async postPDF(request: Request, body: PostPDFDto): Promise<Buffer | object> {
		try {
			return await generatePDF({ html: body.html });
		} catch (error) {
			throw error;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async socketServer(request: Request, body: any): Promise<PostResponseDto> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			console.log({ body });
			await socket.emitMessage('test', 'test');
			return {
				data: null,
				message: 'success',
				statusCode: HTTP_STATUS_CODE.CREATED,
			};
		} catch (error) {
			throw error;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async socketClient(request: Request, body: any): Promise<PostResponseDto> {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			console.log({ body });
			socket_client.sendMessage('test', 'test');
			return {
				data: null,
				message: 'success',
				statusCode: HTTP_STATUS_CODE.CREATED,
			};
		} catch (error) {
			throw error;
		}
	}

	async getByIdParam(param: GetByIdParamDto): Promise<GetByIdResponseDto> {
		try {
			const find = await this.prisma.list_cetak_rekonsil.findFirst({ where: { AND: { id_cetak_rekonsil: param.id, deletedAt: { not: null } } } });
			if (!find) {
				throw new NotFoundException('Data tidak ditemukan!');
			}

			return {
				statusCode: HTTP_STATUS_CODE.OK,
				data: find,
				message: 'success',
			};
		} catch (error) {
			throw error;
		}
	}

	async getByListQuery(query: GetListQueryDto): Promise<GetListResponseDto> {
		try {
			const offset = (query.page - 1) * query.limit;
			const [find, totalCountResult] = await Promise.all([
				this.prisma.executeSelectQuery<[]>(`SELECT * FROM list_cetak_rekonsil LIMIT ${query.limit} OFFSET ${offset}`),
				this.prisma.executeSelectOneQuery<{ count: number }>(`SELECT COUNT(*) FROM list_cetak_rekonsil`),
			]);

			return {
				statusCode: HTTP_STATUS_CODE.OK,
				data: find,
				message: 'success',
				meta_data: {
					limit: query.limit,
					page: query.page,
					total: Number(totalCountResult.count),
				},
			};
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async deleteByIdParam(request: Request, param: DeleteByIdParamDto): Promise<DeleteResponseDto> {
		try {
			const find = await this.prisma.list_cetak_rekonsil.findFirst({ where: { AND: { id_cetak_rekonsil: param.id, deletedAt: null } } });
			console.log({ find });
			if (!find) {
				throw new NotFoundException('Data tidak ditemukan!');
			}

			const result = await this.prisma.list_cetak_rekonsil.update({
				where: {
					id_cetak_rekonsil_createdAt: {
						id_cetak_rekonsil: param.id,
						createdAt: find.createdAt,
					},
				},
				data: {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					...CrudAddition.helper_delete(request as any),
				},
			});
			return {
				statusCode: HTTP_STATUS_CODE.OK,
				data: result,
				message: 'success',
			};
		} catch (error) {
			throw error;
		}
	}

	async deleteByQuery(request: Request, query: DeleteByIdQueryDto): Promise<DeleteResponseDto> {
		try {
			const find = await this.prisma.list_cetak_rekonsil.findFirst({ where: { AND: { id_cetak_rekonsil: query.id, deletedAt: null } } });
			if (!find) {
				throw new NotFoundException('Data tidak ditemukan!');
			}

			const result = await this.prisma.list_cetak_rekonsil.update({
				where: {
					id_cetak_rekonsil_createdAt: {
						id_cetak_rekonsil: query.id,
						createdAt: find.createdAt,
					},
				},
				data: {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					...CrudAddition.helper_delete(request as any),
				},
			});
			return {
				statusCode: HTTP_STATUS_CODE.OK,
				data: result,
				message: 'success',
			};
		} catch (error) {
			throw error;
		}
	}
}
