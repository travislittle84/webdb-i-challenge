const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router()

// GET
router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts')
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json({ message: 'Server could not get Accounts.'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const account = await db('accounts').where('id', id)
        if(account.length > 0) {
            res.status(200).json(account)
        } else {
            res.status(404).json(`Invalid Account ID: ${id}`)
        }

    }  catch (error) {
        res.status(500).json({ message: `Server could not get Account with ID: ${id}.`})
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const accountData = req.body
        const newAccountID = await db('accounts').insert(accountData)
        res.status(201).json({ createdAccountID: newAccountID })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: 'Server could not create Account.'})
    }
})

// PUT
router.put('/:id', async (req, res) => {
    try {
        const changeData = req.body
        const { id } = req.params
    
        const updatedAccountCount = await 
            db('accounts')
            .where('id', id)
            .update(changeData)
        if(updatedAccountCount) {
            res.status(200).json({ "Accounts Updated: ": updatedAccountCount })
        } else {
            res.status(404).json({ message: "Invalid Account ID, did not update."})
        }
        
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: 'Server could not update Account.'})
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedAccountCount = await db('accounts').where('id', id).del(id)
        res.status(200).json({ "Accounts Deleted": deletedAccountCount })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: 'Server could not delete Account.'})
    }
})

module.exports = router