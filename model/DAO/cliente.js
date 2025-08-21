const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertClientes = async function (animal){
    try {
        let sql = `insert into tbl_clientes(nome,email,telefone,cidade)
    values(
        '${animal.nome}',
        '${animal.email}',
        '${animal.telefone}',
        '${animal.cidade}'
    );`
        
        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result)

        if (result) {
            let sqlSelect = `SELECT * FROM tbl_clientes WHERE nome = '${animal.nome}' ORDER by id DESC LIMIT 1`
            let criado = await prisma.$queryRawUnsafe(sqlSelect)
            return criado[0]
        } else {
            return false
        }
    } catch (error){
        return false
    }
}

const updateClientes = async function (animal) {
    try{
        let sql = `update tbl_clientes set nome = '${animal.nome}',
                                           email = '${animal.email}',
                                           telefone = '${animal.telefone}',
                                           cidade = '${animal.cidade}'
                                           where id = ${animal.id}`
                                        
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
        let idAnimal = id
        let sql = `SELECT * FROM tbl_clientes WHERE id = ${idAnimal}`

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