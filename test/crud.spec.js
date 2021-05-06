const { PrismaClient } = require('@prisma/client');
const { expect } = require('chai');
const prisma = new PrismaClient()

describe('CRUD', () => {
	beforeEach(async() => {
		await prisma.todo.deleteMany({});
		await prisma.user.deleteMany({});
		this.todo = await prisma.todo.create({
			data: {
				name: "Present Prisma ORM",
				owner: {
					create: {
						username: 'cherif',
						email: 'cherif@site.com'
					}
				}
			}
		});
	});

	afterEach(async () => {
		await prisma.$disconnect();
	});

	it('creates todos', async () => {
		console.log(this.todo);
		expect(this.todo.id).to.not.be.null;
	});

	it('reads todos', async() => {
		const persisted = await prisma.todo.findUnique({
			where: { id: Number(this.todo.id) }
		});
		expect(persisted).to.deep.eq(this.todo);
	});

	it('updates todos', async() => {
		const updated = await prisma.todo.update({
			where: {id: Number(this.todo.id)},
			data: {done: true, description: 'Some text here'}
		});

		expect(updated.done).to.be.true;

		expect(updated.id).to.equal(this.todo.id);

		this.todo = await prisma.todo.findUnique({
			where: {id: Number(this.todo.id)}
		});
		expect(this.todo.done).to.be.true;
	});

	it('deletes todos', async () => {
		const deleted = await prisma.todo.delete({
			where: { id: this.todo.id }
		});

		expect(deleted.id).to.eq(this.todo.id);

		const todo = await prisma.todo.findUnique({where: {id: this.todo.id}});

		expect(todo).to.be.null;
	});
});