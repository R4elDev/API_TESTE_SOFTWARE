const MESSAGE = require('../../modulo/config.js')

const clienteDAO = require('../../model/DAO/cliente.js')


const inserirCliente = async function(cliente,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                cliente.nome                 == undefined ||            cliente.nome                    == '' ||            cliente.nome                    == null || cliente.nome.length                     > 100    ||
                cliente.email                == undefined ||            cliente.email                   == '' ||            cliente.email                   == null || cliente.email.length                    > 100    ||
                cliente.telefone             == undefined ||            cliente.telefone                == '' ||            cliente.telefone                == null || cliente.telefone.length                 > 20     ||
                cliente.cidade               == undefined ||            cliente.cidade                  == '' ||            cliente.cidade                  == null || cliente.cidade.length                   > 50     
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else {
                let resultCliente = await clienteDAO.insertClientes(cliente)

                if(resultCliente){
                    const clienteBuscado = await buscarCliente(resultCliente.id)
                    return {
                        message: MESSAGE.SUCCESS_CREATED_ITEM,
                        clienteBuscado
                    };
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarCliente = async function(cliente,id,contentType){
    try{
        if(contentType == 'application/json'){
            if(
                id                           == undefined ||            id  ==  ''                            ||            id  == null                             || isNaN(id)                                        || id <= 0 ||
                cliente.nome                 == undefined ||            cliente.nome                    == '' ||            cliente.nome                    == null || cliente.nome.length                     > 100    ||
                cliente.email                == undefined ||            cliente.email                   == '' ||            cliente.email                   == null || cliente.email.length                    > 100    ||
                cliente.telefone             == undefined ||            cliente.telefone                == '' ||            cliente.telefone                == null || cliente.telefone.length                 > 20     ||
                cliente.cidade               == undefined ||            cliente.cidade                  == '' ||            cliente.cidade                  == null || cliente.cidade.length                   > 50     
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else {
                let resultCliente = await buscarCliente(parseInt(id))



                if(resultCliente.status_code == 200){
                    cliente.id = parseInt(id)

                    let result = await clienteDAO.updateClientes(cliente)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else if(resultCliente.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirCliente = async function(id){
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else {
            let resultCliente = await buscarCliente(parseInt(id))

            if(resultCliente.status_code == 200){
                let result = await clienteDAO.deleteClientes(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultCliente.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }catch(error){
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarClientes = async function() {
    try {
        let dadosClientes = {}

        let resultClientes = await clienteDAO.selectAllClientes()

        if (resultClientes && typeof resultClientes === 'object') {
            if (resultClientes.length > 0) {
                dadosClientes.status = true
                dadosClientes.status_code = 200
                dadosClientes.items = resultClientes.length

                // Aqui você realmente retorna o que veio do banco
                dadosClientes.clientes = resultClientes

                return dadosClientes
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


const buscarCliente = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }

        let idCliente = parseInt(id)
        let dadosCliente = {}

        let resultCliente = await clienteDAO.selectByIdClientes(idCliente)

        if (resultCliente && typeof resultCliente === 'object') {
            if (resultCliente.length > 0) {
                dadosCliente.status = true
                dadosCliente.status_code = 200

                // aqui você realmente devolve os dados
                dadosCliente.cliente = resultCliente  

                return dadosCliente
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


module.exports = {
    inserirCliente,
    atualizarCliente,
    buscarCliente,
    excluirCliente,
    listarClientes
}