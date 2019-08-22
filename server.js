const express = require('express');


const server = express();

const AccountsRouter = require('./accounts/accounts-router.js')

server.use(express.json());

server.use('/api/accounts', AccountsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>WebDB Challenge #1 - Travis Little</h2>`)
})

module.exports = server;