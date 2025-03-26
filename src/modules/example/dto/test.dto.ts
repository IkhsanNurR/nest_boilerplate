import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';

export class InnerItemDto {
	@IsString()
	@IsNotEmpty()
	value: string;

	@IsString()
	@IsNotEmpty()
	label: string;
}

export class OuterItemDto {
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayNotEmpty()
	@Type(() => InnerItemDto)
	data: InnerItemDto[];
}

export class PostPDFDto {
	@IsObject()
	@ValidateNested({ each: true })
	@Type(() => InnerItemDto)
	test: InnerItemDto;

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayNotEmpty()
	@Type(() => InnerItemDto)
	test2: InnerItemDto[];

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayNotEmpty()
	@Type(() => OuterItemDto)
	test3: OuterItemDto[];
}
