import { Request } from 'express';
import * as moment from 'moment';

interface UserHeader {
	username?: string;
	iduser?: number;
}

interface CustomRequest extends Request {
	headers: Request['headers'] & {
		user?: UserHeader;
	};
	ip_client?: string; // Asumsi tipe untuk ip_client
}

export class CrudAddition {
	static helper_create(req: CustomRequest) {
		return {
			createdName: req.headers?.user?.username ?? '-',
			createdCode: req?.ip,
			createdBy: req.headers?.user?.iduser ?? 0,
			createdAt: moment().toISOString(),
		};
	}

	static helper_update(req: CustomRequest) {
		return {
			updatedName: req.headers?.user?.username ?? '-',
			updatedCode: req?.ip,
			updatedBy: req.headers?.user?.iduser ?? 0,
			updatedAt: moment().toISOString(),
		};
	}

	static helper_delete(req: CustomRequest) {
		return {
			deletedName: req.headers?.user?.username ?? '-',
			deletedCode: req?.ip,
			deletedBy: req.headers?.user?.iduser ?? 0,
			deletedAt: moment().toISOString(), // Konversi moment object ke Date object
		};
	}
}
