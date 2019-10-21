const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const bearerToken = req.get('Authorization')
    if (!bearerToken){
        return res.status(401).send('Not authenticated for this action')
    }
    try {
        const token = bearerToken.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
        if (!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({error: 'Please Authenticate'})
    }
}

module.exports = auth