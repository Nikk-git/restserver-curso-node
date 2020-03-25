const express = require('express');

const { tokenVerification } = require('../middlewares/authentication');


let app = express();
let Product = require('../models/product');


app.get('/product', tokenVerification, (req, res) => {

    let since = req.query.since || 0;
    since = Number(since);

    Product.find({ available: true })
        .skip(since)
        .limit(5)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });


        })

});


app.get('/product/:id', (req, res) => {

    let id = req.params.id;

    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, productDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                product: productDB
            });

        });

});


app.get('/product/find/:term', tokenVerification, (req, res) => {

    let term = req.params.tem;

    let regex = new RegExp(term, 'i');

    Product.find({ name: regex })
        .populate('category', 'name')
        .exec((err, products) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            })

        })


});




app.post('/product', tokenVerification, (req, res) => {

    let body = req.body;

    let product = new Product({
        user: req.user._id,
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        available: body.available,
        category: body.category
    });

    product.save((err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });

    });

});


app.put('/product/:id', tokenVerification, (req, res) => {


    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productDB.name = body.name;
        productDB.unitPrice = body.unitPrice;
        productDB.category = body.category;
        productDB.available = body.available;
        productDB.description = body.description;

        productDB.save((err, SavedProduct) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: SavedProduct
            });

        });

    });


});


app.delete('/product/:id', tokenVerification, (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productDB.available = false;

        productDB.save((err, deletedProduct) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: deletedProduct,
                mensaje: 'deleted product succesfully'
            });

        })

    })


});






module.exports = app;