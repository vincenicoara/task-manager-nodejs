const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET /tasks?completed=false
//GET /tasks?limit10
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    try {
        //Setting the 'sort' option for sortBy
        if (req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1]
        }
        await req.user.populate({
            path: 'tasks',
            match, 
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (err) {
        res.status(500)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task){
            return res.status(404).send('No task found')
        }
        res.send(task)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.filter((val) => {
        return !allowedUpdates.includes(val) 
    }).length == 0

    if(!isValid) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task){
            res.status(404).send('Task not found')
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (err) {
        res.status(400)
    }

} )

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        console.log(task)
        if (!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})


module.exports = router