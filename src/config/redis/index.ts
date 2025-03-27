import { REDIS_HOST } from '@config_env';
import { createClient, RedisClientType } from 'redis';

let client1Instance: RedisClientType | null = null;
let client2Instance: RedisClientType | null = null;

class RedisClients {
	private constructor() {
		// Private constructor to prevent direct instantiation
	}

	public static async getClient1(): Promise<RedisClientType> {
		if (!client1Instance) {
			client1Instance = createClient({
				url: REDIS_HOST,
				pingInterval: 10000,
			});

			client1Instance.on('connect', () => console.log(` 🚀 Redis Client 1 Connected`));
			client1Instance.on('error', (err) => console.error(` Redis Client 1 Error`, err));

			await client1Instance.connect();
		}
		return client1Instance;
	}

	public static async getClient2(): Promise<RedisClientType> {
		if (!client2Instance) {
			client2Instance = createClient({
				url: REDIS_HOST,
				pingInterval: 10000,
			});

			client2Instance.on('connect', () => console.log(` 🚀 Redis Client 2 Connected`));
			client2Instance.on('error', (err) => console.error(` Redis Client 2 Error`, err));

			await client2Instance.connect();
		}
		return client2Instance;
	}
}

export const CLIENT_1 = RedisClients.getClient1();
export const CLIENT_2 = RedisClients.getClient2();
