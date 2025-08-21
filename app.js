const express = require('express')
const cors = require('cors')
const routes = require('./routes/route.js')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/v1/teste-software', routes)

module.exports = app   // <-- exporta o app direto
