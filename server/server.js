const express = require('express')
const mongoose = require('mongoose')

const path = require('path')

const app = express()

require('./config/config')

const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Enable the public folder
app.use(express.static(path.resolve(__dirname, '../public')))


// Global routes configuration
app.use(require('./routes/index'))



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err

    console.log('DataBase ONLINE');
})


app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
})