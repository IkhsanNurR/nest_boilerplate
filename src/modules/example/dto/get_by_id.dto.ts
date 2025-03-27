import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetByIdParamDto {
	@Type(() => Number)
	@IsInt({ message: 'ID harus berupa angka' })
	@Min(1, { message: 'ID harus lebih dari 0' })
	id: number;
}

export class GetListQueryDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt({ message: 'Page harus berupa angka' })
	@Min(1, { message: 'Page minimal 1' })
	page?: number;

	@IsNotEmpty()
	@Type(() => Number)
	@IsInt({ message: 'Limit harus berupa angka' })
	@Min(1, { message: 'Limit minimal 1' })
	limit?: number;
}
