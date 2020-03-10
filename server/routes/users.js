const express = require('express')
const User = require('../models/user')

const app = express()




app.get('/user/', (req, res) => {
    res.json('get User')
})

app.post('/user', (req, res) => {

    let body = req.body

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    })

    user.save((err, userDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })
})

app.put('/user/:id', (req, res) => {

    let id = req.params.id

    res.json({
        id
    })
})

app.delete('/user', (req, res) => {
    res.json('delete User')
})



module.exports = app