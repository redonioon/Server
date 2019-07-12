const jwt = require('jsonwebtoken')

module.exports = {
    sign: function (val) {
        let token = jwt.sign(val, process.env.JWT_SECRET)
        return token
    },
    verify: function (val) {
        try {
            return jwt.verify(val, process.env.JWT_SECRET)
        } catch {
            return ({
                code: 401,
                message: `Unauthenticated`
            })
        }
    }
}