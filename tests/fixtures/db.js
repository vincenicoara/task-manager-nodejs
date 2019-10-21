const jwt = require('jsonwebtoken')
const mongoose = require('../../src/db/mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Michael',
    email: 'michael@gmail.com',
    password: 'michael1234',
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Flaxseed',
    email: 'Flaxseed@gmail.com',
    password: 'Flaxseed1234',
    tokens: [{
        token: jwt.sign({_id: userTwoID}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOneID
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOneID
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: false,
    owner: userTwoID
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await User(userOne).save()
    await Task(taskOne).save()
    await Task(taskTwo).save()
    await Task(taskThree).save()
}

module.exports = {
    userOne,
    userOneID,
    setupDatabase,
    taskOne,
    taskTwo,
    taskThree
}