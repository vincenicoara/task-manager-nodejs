require('../src/db/mongoose')
const Task = require('../src/models/task')

const _id = '5d9f467d1dc6ab1b5bc01bd2'

// Task.findOneAndDelete({_id}).then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((numberTasks) => {
//     console.log('Number of tasks', numberTasks)
// }).catch((err) => {
//     console.log(err)
// })

const deleteTaskAndCount = async (_id) => {
    const deletedTask = await Task.findOneAndDelete({_id})
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount(_id).then((res) => {
    console.log('count', res)
}).catch((err) => {
    console.log('error', err)
})