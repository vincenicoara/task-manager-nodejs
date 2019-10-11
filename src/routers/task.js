const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500)
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router