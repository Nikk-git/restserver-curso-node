const jwt = require('jsonwebtoken')

//======================
// Token authentication
//======================

let tokenVerification = (req, res, next) => {

    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.user

        next()


    })
}

//=========================
// adminRole authentication
//=========================

let adminRoleVerification = (req, res, next) => {

    let user = req.user

    if (user.role === 'ADMIN_ROLE') {
        next()
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'This User not is an administrator'
            }
        })
    }

}




module.exports = {
    tokenVerification,
    adminRoleVerification
}