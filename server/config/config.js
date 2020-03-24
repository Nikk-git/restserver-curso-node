//=============================
// Puerto
//=============================
process.env.PORT = process.env.PORT || 3000

//=============================
// Entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=============================
// the JWT expiry date
//=============================

process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30

//=============================
// SEED of autentication
//=============================

process.env.SEED = process.env.SEED || 'development-seed'


//=============================
// Data Base
//=============================

let urlDB

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/Coffee-Hater'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB