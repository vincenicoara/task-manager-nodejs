const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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

        const user = await User.findById(id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(400)
    }
})

router.delete('/users/:id', async (req, res) => {
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

module.exports = router