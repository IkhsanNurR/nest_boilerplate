import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';
import sharp from 'sharp';

interface FileValidationOptions {
	allowedExtensions?: string[];
	maxSizeMB?: number;
	compress?: boolean;
}

@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
	private allowedExtensions?: string[];

	private maxSizeMB?: number;

	private compress?: boolean;

	constructor(options: FileValidationOptions = {}) {
		this.allowedExtensions = options.allowedExtensions;
		this.maxSizeMB = options.maxSizeMB;
		this.compress = options.compress;
	}

	async transform(file: Express.Multer.File): Promise<Express.Multer.File> {
		if (!file) {
			throw new BadRequestException('No file provided');
		}

		const extension = extname(file.originalname).toLowerCase();

		// 1️⃣ **Cek Ekstensi File (Jika allowedExtensions di-set)**
		if (this.allowedExtensions && !this.allowedExtensions.includes(extension)) {
			throw new BadRequestException(`File type ${extension} is not supported`);
		}

		// 2️⃣ **Cek Ukuran File (Jika maxSizeMB di-set)**
		if (this.maxSizeMB) {
			const maxSizeBytes = this.maxSizeMB * 1024 * 1024;
			if (file.size > maxSizeBytes) {
				throw new BadRequestException(`File size exceeds ${this.maxSizeMB}MB`);
			}
		}

		// 3️⃣ **Kompresi Gambar (Jika compress true & formatnya gambar)**
		if (this.compress && ['.png', '.jpeg', '.jpg'].includes(extension)) {
			file.buffer = await sharp(file.buffer)
				.jpeg({ quality: 80 }) // Kompres kualitas ke 80%
				.png({ quality: 80 }) // Kompres kualitas ke 80%
				.toBuffer();
		}

		return file;
	}
}
