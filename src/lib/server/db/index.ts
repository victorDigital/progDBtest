import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

let client: mysql.Connection;

export async function getClient() {
	if (!client) {
		client = await mysql.createConnection(env.DATABASE_URL);
	}
	return client;
}

export const db = drizzle(await getClient());
