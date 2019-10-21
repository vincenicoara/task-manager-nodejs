const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOne, userOneID, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should signup user', async () => {
    const userToSubmit = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const response = await request(app)
        .post('/users/signup')
        .send(userToSubmit)
        .expect(200)

        const user = await User.findById(response.body.user._id)
        expect(user).not.toBeNull()

        expect(response.body.user).toMatchObject({
            name: userToSubmit.name,
            email: userToSubmit.email
        })

        expect(user.password).not.toBe(userToSubmit.password)
})

test('Should login user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    const user = await User.findById(userOneID)
    
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login')
    .send({
        email: 'foo@gmail.com',
        password: '12343lkj34'
    })
    .expect(400)
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should NOT get profile for unauthenticaed user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should NOT delete for unauthenticated user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async ()  => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Barney'
        })
        .expect(200)
    expect(response.body.name).toBe('Barney')
})

test('Should not update invalid fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            model: 'Corolla'
        })
        .expect(400)
})

test('Should delete user', async () => {
    await request(app).delete('/users/me')
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})








