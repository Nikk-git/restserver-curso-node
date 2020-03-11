//=============================
// Puerto
//=============================
process.env.PORT = process.env.PORT || 3000

//=============================
// Entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=============================
// Data Base
//=============================

let urlDB

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/Coffee-Hater'
} else {
    urlDB = 'mongodb+srv://deadpool:A190WNNO5tHMBiwO@cluster0-vqa3p.mongodb.net/Coffee-Hater'
}

process.env.URLDB = urlDB