const { PrismaClient } = require('@prisma/client');
const { expect } = require('chai');
const prisma = new PrismaClient();
describe('Filtering and sorting', async() => {
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

	it('filters todos starting with `Do something`', async () => {
		const result = await prisma.todo.findMany({
			where: {
				name: {
					startsWith: 'Do something'
				}
			}
		});
		expect(result.length).to.equal(2);
	});

	it('filters includes `else`', async () => {
		const result = await prisma.todo.findMany({
			where: {
				name: {
					contains: 'else'
				}
			}
		});
		expect(result.length).to.equal(1);
	});

	it('filters a user todos', async() => {
		const result = await prisma.todo.findMany({
			where: {
				owner: {
					username: { equals: 'cherif'}
				}
			}
		});
		expect(result.length).to.equal(2);

		const result2 = await prisma.todo.findMany({
			where: {
				owner: {
					username: { equals: 'foo'}
				}
			}
		});

		expect(result2.length).to.equal(0);
	});
});