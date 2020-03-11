const express = require('express')

const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const _ = require('underscore')

const User = require('../models/user')

const app = express()


mongoose.set('useFindAndModify', false)


app.get('/user', (req, res) => {

    let since = req.query.since || 0
    since = Number(since)

    let limit = req.query.limit
    limit = Number(limit)

    User.find({ status: true })
        .skip(since)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.countDocuments({ status: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    users,
                    count: conteo
                })
            })
        })

})

app.post('/user', (req, res) => {

    let body = req.body

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status'])

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
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

app.delete('/user/:id', (req, res) => {

    let id = req.params.id

    let changeStatus = {
        status: false
    }


    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userStatus) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!userStatus) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "User not found"
                }
            })
        }


        res.json({
            ok: true,
            user: userStatus
        })

    })

    // User.findByIdAndRemove(id, (err, userDeleted) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if (!userDeleted) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: "User not found"
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         user: userDeleted
    //     })

    // })


})



module.exports = app