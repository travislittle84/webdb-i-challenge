const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts')
        console.log("ACCOUNTS", accounts)
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json({ message: 'Server could not get Accounts.'})
    }
})

module.exports = router