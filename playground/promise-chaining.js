require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d9ec31bb101da19c8f28491

const id = '5d9ec31bb101da19c8f28491'


// User.findByIdAndUpdate(id, {
//     age: 1
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: user.age})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count;
}

updateAgeAndCount(id, 48).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})