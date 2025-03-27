import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class DeleteByIdParamDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt({ message: 'ID harus berupa angka' })
	@Min(1, { message: 'ID harus lebih dari 0' })
	id: number;
}

export class DeleteByIdQueryDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt({ message: 'ID harus berupa angka' })
	@Min(1, { message: 'ID harus lebih dari 0' })
	id: number;
}
