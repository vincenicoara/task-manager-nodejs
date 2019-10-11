const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        console.log('searching by id', _id)
        const user = await User.findById(_id)
        console.log('searched')
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'password', 'email', 'age']
    const isValid = updates.filter((val) => {
        return !allowedUpdates.includes(val) 
    }).length == 0

    if(!isValid) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    console.log('isValid', isValid)

    const id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(400)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task){
            return res.status(404).send('No task found')
        }
        res.send(task)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.filter((val) => {
        return !allowedUpdates.includes(val) 
    }).length == 0

    if(!isValid) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const user = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        res.send(user)
    } catch (err) {
        res.status(400)
    }

} )

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)
        console.log(task)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id) 
        if (!user){ 
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



