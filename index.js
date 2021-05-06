const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async () => {
	return await prisma.todo.create({
		data: {
			name: "present Prisma ORM",
			Owner: {
				create: {
					username: 'cherif',
					email: 'cherif@site.com'
				}
			}
		}
	});
}

const app = async () => {
	const todo = await create();
	console.log(todo);
}

app().catch(e => {
	throw e
}).finally(async() => {
	await prisma.$disconnect();
});