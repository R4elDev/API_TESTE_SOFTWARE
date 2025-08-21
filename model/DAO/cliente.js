const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertClientes = async function (cliente){
    try {
        let sql = `insert into tbl_clientes(nome,email,telefone,cidade)
    values(
        '${cliente.nome}',
        '${cliente.email}',
        '${cliente.telefone}',
        '${cliente.cidade}'
    );`
        
        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_clientes WHERE nome = '${cliente.nome}' ORDER by id DESC LIMIT 1`
            let criado = await prisma.$queryRawUnsafe(sqlSelect)
            return criado[0]
        } else {
            return false
        }
    } catch (error){
        return false
    }
}

const updateClientes = async function (cliente) {
    try{
        let sql = `update tbl_clientes set nome = '${cliente.nome}',
                                           email = '${cliente.email}',
                                           telefone = '${cliente.telefone}',
                                           cidade = '${cliente.cidade}'
                                           where id = ${cliente.id}`
                                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else {
            return false
        }
    }catch (error){
        console.log(error)
        return false
    }
}

const deleteClientes = async function (id) {
    try {
        let idCliente = id

        let sql = `delete from tbl_clientes where id = ${idCliente}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectAllClientes = async function () {
    try {
        let sql = 'SELECT * FROM tbl_clientes'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }

    }catch (error) {
        console.log(error)
        return false
    }
}

const selectByIdClientes = async function (id) {
    try{
        let idcliente = id
        let sql = `SELECT * FROM tbl_clientes WHERE id = ${idcliente}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

module.exports = {
    insertClientes,
    updateClientes,
    deleteClientes,
    selectAllClientes,
    selectByIdClientes
}