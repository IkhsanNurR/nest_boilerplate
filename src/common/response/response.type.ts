export class BaseResponseDto<T = unknown> {
	statusCode: number;
	message: string;
	timestamp?: string;
	data?: T;
	error?: any;
	curl?: any;

	constructor(partial: Partial<BaseResponseDto<T>>) {
		Object.assign(this, partial);
		this.timestamp = new Date().toISOString(); // Otomatis isi timestamp
	}
}

export class MetaData {
	total: number;
	limit: number;
	page: number;

	constructor(partial: Partial<MetaData>) {
		Object.assign(this, partial);
	}
}

export class GetListResponseDto<T = unknown> extends BaseResponseDto<T[]> {
	meta_data: MetaData;

	constructor(partial: Partial<GetListResponseDto<T>>) {
		super(partial);
		this.meta_data = new MetaData(partial.meta_data || {});
	}
}

export class GetByIdResponseDto<T = unknown> extends BaseResponseDto<T> {
	constructor(partial: Partial<GetByIdResponseDto<T>>) {
		super(partial);
	}
}

export class PostResponseDto<T = unknown> extends BaseResponseDto<T> {
	constructor(partial: Partial<PostResponseDto<T>>) {
		super(partial);
	}
}

export class UpdateResponseDto<T = unknown> extends BaseResponseDto<T> {
	constructor(partial: Partial<UpdateResponseDto<T>>) {
		super(partial);
	}
}

export class DeleteResponseDto<T = unknown> extends BaseResponseDto<T> {
	constructor(partial: Partial<DeleteResponseDto<T>>) {
		super(partial);
	}
}
