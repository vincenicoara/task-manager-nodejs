const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
    if (err){
        return console.log('Unable to connect to db')
    }

    const db = client.db(databaseName)
    // const a = db.collection('users').findOne({name: 'Garry'}, (err, user) => {
    //     console.log(user)
    // })

    const a = db.collection('users').deleteMany({
        age: 23
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    

})



