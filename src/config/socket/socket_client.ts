import { io, Socket } from 'socket.io-client';
import { SOCKET_HOST } from '@config_env'; // Sesuaikan dengan konfigurasi Redis atau WebSocket Server

class SocketClient {
	private static instance: SocketClient | null = null;
	private socket: Socket;

	private constructor() {
		this.socket = io(SOCKET_HOST, {
			transports: ['websocket'],
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 2000,
		});

		this.socket.on('connect', () => {
			console.log('✅ Socket Client Connected:', this.socket.id);
		});

		this.socket.on('disconnect', (reason) => {
			console.warn('⚠️ Socket Client Disconnected:', reason);
		});

		this.socket.on('connect_error', (err) => {
			console.error('❌ Socket Client Connection Error:', err.message);
		});
	}

	public static getInstance(): SocketClient {
		if (!SocketClient.instance) {
			SocketClient.instance = new SocketClient();
		}
		return SocketClient.instance;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public sendMessage(jenis: string, data: any): void {
		if (this.socket.connected) {
			this.socket.emit(jenis, data);
			console.log(`📤 Message Sent: ${jenis}`, data);
		} else {
			console.error('🚫 Socket is not connected.');
		}
	}

	public onMessage(event: string, callback: (data: any) => void): void {
		this.socket.on(event, callback);
	}
}

export default SocketClient.getInstance();
