const express = require('express')

let { tokenVerification, adminRoleVerification } = require('../middlewares/authentication')

let app = express()

let Category = require('../models/category')


app.get('/category', tokenVerification, (req, res) => {

    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categories) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categories
            });

        })

})


app.get('/category/:id', tokenVerification, (req, res) => {

    let id = req.params.id;

    Category.findById(id, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            categoria: categoryDB
        })

    })
})

app.post('/category', tokenVerification, (req, res) => {
    let body = req.body

    let category = new Category({
        description: body.description,
        user: req.user._id
    })

    category.save((err, categoryDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoryDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            category: categoryDB
        })
    })

})

app.put('/category/:id', (req, res) => {

    let id = req.params.id;

    let body = req.body;

    let descCategory = {
        description: body.description
    };

    Category.findByIdAndUpdate(id, descCategory, { new: true, runValidators: true }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

})

app.delete('/category/:id', [tokenVerification, adminRoleVerification], (req, res) => {

    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });

    });
})












module.exports = app