const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env


const app = express()

app.use(express.json())
app.use(cors())

const {
    login,
    register
} = require('./controllers/auth')

app.post(`/api/login`, login)
app.post(`/api/register`, register)

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`))