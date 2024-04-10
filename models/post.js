const db = require("./banco")

const ProvaP1 = db.sequelize.define("provaP1",{
    nome: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    bairro: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.TEXT
    },
    estado: {
        type: db.Sequelize.TEXT
    }
})

//ProvaP1.sync({force: true})

module.exports = ProvaP1