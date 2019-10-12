const express = require('express')
const mongoose = require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     const task = await Task.findById('5da21a885a57724801a8dadc')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)
//     // const user = await User.findById('5da219191d0fbc47a3656831')
//     // await user.populate('tasks').execPopulate()
//     // console.log(user.tasks)
// }

// main()