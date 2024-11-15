import type { PageServerLoad } from './$types';
import { getClient } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';
import { drizzle } from 'drizzle-orm/mysql2';

export const load = (async () => {
	const client = await getClient();
	const db = drizzle(client);

	const users = await db.select().from(user).execute();
	const serializedUsers = users.map((u) => ({
		id: u.id,
		age: u.age,
		firstName: u.firstName,
		lastName: u.lastName
	}));
	console.log('load');
	console.log(serializedUsers);

	return { users: serializedUsers };
}) satisfies PageServerLoad;

export const actions = {
	addUser: async ({ request }) => {
		const client = await getClient();
		const db = drizzle(client);
		console.log('addUser');
		const formData = await request.formData();
		const age: number = formData.get('age') as any;
		const firstName: string = formData.get('firstName') as any;
		const lastName: string = formData.get('lastName') as any;
		await db.insert(user).values({ age, firstName, lastName }).execute();
	},
	updateUser: async ({ request }) => {
		const client = await getClient();
		const db = drizzle(client);
		console.log('updateUser');
		const formData = await request.formData();
		const id: number = Number(formData.get('id'));
		const age: number = Number(formData.get('age'));
		const firstName: string = formData.get('firstName') as any;
		const lastName: string = formData.get('lastName') as any;
		await db.update(user).set({ age, firstName, lastName }).where(eq(user.id, id)).execute();
	},
	deleteUser: async ({ request }) => {
		const client = await getClient();
		const db = drizzle(client);
		console.log('deleteUser');
		const formData = await request.formData();
		const id: number = Number(formData.get('id'));
		await db.delete(user).where(eq(user.id, id));
	},
	selectUser: async ({ request }) => {
		const client = await getClient();
		const db = drizzle(client);
		console.log('selectUser');
		const formData = await request.formData();
		const id: number = Number(formData.get('id'));
		const userToReturn = await db.select().from(user).where(eq(user.id, id)).execute();
		return { user: userToReturn[0] };
	},
	selectAllUsers: async () => {
		const client = await getClient();
		const db = drizzle(client);
		console.log('selectAllUsers');
		const users = await db.select().from(user).execute();
		const serializedUsers = users.map((u) => ({
			id: u.id,
			age: u.age,
			firstName: u.firstName,
			lastName: u.lastName
		}));
		return { users: serializedUsers };
	}
};
