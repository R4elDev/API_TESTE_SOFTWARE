
 const express   = require('express')
 const cors      = require('cors')
 const app       = express()


app.use(cors())
app.use(express.json())


const routes = require('./routes/route.js')


// Prefixo base da API
app.use('/v1/teste-software', routes)

app.listen('8080',function(){
   console.log('API FUNCIONANDO AGUARDANDO REQUESIÇÕES CHEFE...')
})