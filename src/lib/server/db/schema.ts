import { mysqlTable, serial, text, int } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: serial('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	age: int('age')
});
