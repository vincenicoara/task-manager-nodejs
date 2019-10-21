const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userOne, userOneID, setupDatabase, taskOne, taskTwo, taskThree} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Buy a hot air balloon',
            owner: userOneID
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all tasks for userOne', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not delete other user\'s tasks', async () => {
    await request(app)
        .delete('/tasks/' + taskThree._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(404)
    const task = Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})

test('Should get only tasks that are completed', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0].completed).toBe(true)
})

test('Should limit results to one task', async () => {
    const response = await request(app)
        .get('/tasks?limit=1')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(1)
})

test('Should sort results in ascending/descending order', async () => {
    const responseAsc = await request(app)
        .get('/tasks?sortBy=createdAt:asc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const responseDesc = await request(app)
        .get('/tasks?sortBy=createdAt:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(responseAsc.body[1].createdAt).toBe(responseDesc.body[0].createdAt)
})

test('Should fetch user task by ID', async () => {
    const response = await request(app)
        .get('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.description).toBe(taskOne.description)
})

test('Should not get any tasks if not authenticated', async () => {
    await request(app)
        .get('/tasks')
        .expect(401)
})