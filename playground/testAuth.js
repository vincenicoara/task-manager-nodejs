
const jwt = require('jsonwebtoken')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEwYzJmZjRmMTM4YzM5YTUyMDlmNjUiLCJpYXQiOjE1NzA4MzA4MzF9.W8nBIo1OyL2wxPBW4XiKwsQhLmWVBnLlAlH7M7lenlE'

const ans = jwt.verify(token, 'mycourse')


console.log(ans)
