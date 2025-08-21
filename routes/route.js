const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

const controllerCliente = require('../controller/animal/controllerAnimal.js')

const bodyParserJson = bodyParser.json()

router.use(cors())

router.post('/clientes',bodyParserJson, async (request,response) =>{
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultCliente = await controllerCliente.inserirCliente(dadosBody,contentType)

    response.status(resultCliente.message.status_code)
    response.json(resultCliente)
})

router.get('/clientes', async (request, response) => {
    let resultClientes = await controllerCliente.listarClientes()

    response.status(resultClientes.status_code)
    response.json(resultClientes)
})

router.get('/clientes/:id', async (request, response) =>{
    let id = request.params.id
    let resultCliente = await controllerCliente.buscarCliente(id)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

router.delete('/clientes/:id', async (request, response) => {
    let id = request.params.id
    let resultCliente = await controllerCliente.excluirCliente(id)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

router.put('/clientes/:id', bodyParserJson, async (request, response) => {
    try {
        let contentType = request.headers['content-type']  // corrigido
        let id = request.params.id                        // corrigido
        let dadosBody = request.body                      // corrigido

        let resultCliente = await controllerCliente.atualizarCliente(dadosBody, id, contentType)

        response.status(resultCliente.status_code).json(resultCliente)
    } catch (error) {
        console.error(error)
        response.status(500).json({ status: false, message: 'Erro interno no servidor' })
    }
})


module.exports = router;