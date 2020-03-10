const express = require('express')
const mongoose = require('mongoose')

const app = express()

require('./config/config')

const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/users'))


mongoose.connect('mongodb://localhost:27017/Coffee_Hater', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {

    if (err) throw err

    console.log('DataBase ONLINE');
})


app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
})