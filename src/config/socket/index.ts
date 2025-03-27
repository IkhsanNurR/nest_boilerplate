import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { CLIENT_1, CLIENT_2 } from '../redis/index'; // Pastikan path ini benar

class SocketWeb {
	private io: SocketIOServer;
	private static instance: SocketWeb | null = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static client1: any = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static client2: any = null;
	private server: Server;

	private constructor(server: Server) {
		this.server = server;
		this.io = new SocketIOServer(server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
				credentials: true,
			},
			transports: ['websocket'],
		});
		// Adapter diinisialisasi setelah client Redis tersedia
	}

	public static async getInstance(server: Server): Promise<SocketWeb> {
		await SocketWeb.initialize();
		if (!SocketWeb.instance) {
			SocketWeb.instance = new SocketWeb(server);
			// Inisialisasi adapter di sini setelah instance dibuat dan client Redis siap
			SocketWeb.instance.io.adapter(createAdapter(SocketWeb.client1, SocketWeb.client2));
			SocketWeb.instance.io.on('connect', () => {
				console.log('Web Socket connected to the server!');
			});
		}
		return SocketWeb.instance;
	}

	public static async initialize(): Promise<void> {
		SocketWeb.client1 = await CLIENT_1;
		SocketWeb.client2 = await CLIENT_2;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async emitMessage(jenis: string, data: any): Promise<void> {
		try {
			await this.io.emit(jenis, data);
			console.log('Message emitted:', data);
		} catch (error) {
			console.error('Error emitting message:', error);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async emitManyMessage(dataArray: { jenis: string; data: any }[]): Promise<void> {
		try {
			const promises = dataArray.map(({ jenis, data }) => this.emitMessage(jenis, data));
			await Promise.all(promises);
		} catch (error) {
			console.error('Error emitting message:', error);
			throw error;
		}
	}
}

export default SocketWeb.getInstance;

export const socket = {
	emitMessage: async (jenis: string, data: any): Promise<void> => {
		const instance = await SocketWeb.getInstance(null as any); // Dapatkan instance (server bisa null setelah inisialisasi)
		return instance.emitMessage(jenis, data);
	},
	emitManyMessage: async (dataArray: { jenis: string; data: any }[]): Promise<void> => {
		const instance = await SocketWeb.getInstance(null as any); // Dapatkan instance
		return instance.emitManyMessage(dataArray);
	},
	getInstance: SocketWeb.getInstance, // Ekspor getInstance dari SocketWeb
};
