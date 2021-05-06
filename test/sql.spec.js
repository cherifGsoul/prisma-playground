const { PrismaClient } = require('@prisma/client');
const { expect } = require('chai');
const prisma = new PrismaClient();
describe('Raw SQL', async() => {
	beforeEach(async () => {
		await prisma.todo.deleteMany({});
		await prisma.user.deleteMany({});
		const todos = ['Do something', 'Do something else'];
		todos.forEach(async (todo) => {
			await prisma.todo.create({
				data: {
					name: todo,
					owner: {
						create: {
							username: 'cherif',
							email: 'cherif@site.com'
						}
					}
				}
			});
		});
		await prisma.todo.findMany({});
	});

	afterEach(async () => {
		await prisma.$disconnect();
	});

	it('finds all todos with sql', async() => {
		const todos = await prisma.$queryRaw(`SELECT * FROM Todo`);
		expect(todos.length).to.eq(2);
	});

	it('updates todos with sql', async() => {
		const todos = await prisma.$queryRaw(`SELECT * FROM Todo`);
		const todo = todos[0];
		const id = todo.id;
		await prisma.$queryRaw(`UPDATE Todo SET done = true WHERE id = ${id}`);
		const updated = await prisma.todo.findUnique({where:{id: id}});
		expect(updated.done).to.be.true;
	})
});