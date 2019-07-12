const userModel = require('../models/userModel')
const userFavorite = require('../models/userFavorite')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwtoken')

class UserClass {
    static signup(req, res, next) {
        let { username, email, password } = req.body
        let newUser = { username, email, password }

        userModel
            .create(newUser)
            .then((created) => {
                res.status(201).json(created)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        let { username, password } = req.body

        userModel
            .findOne({
                username: username
            })
            .then((found) => {
                if (found) {
                    if (compare(password, found.password)) {
                        let payload = {
                            _id: found._id,
                            username: found.username,
                            email: found.email
                        }
                        let token = sign(payload)
                        res.status(200).json({ token })
                    }
                    else {
                        throw `Invalid username / password`
                    }
                }
                else {
                    throw `Invalid username / password`
                }
            })
            .catch(next)

    }

    static googleLogin(req, res, next) {

    }

    static favorite(req, res, next) {
        const { label, urlImage, recipe } = req.body
        let dataToCreate = {
            // userId = ini harusnya dapet dari req headernya ga sih ? sesuai yang lagi login siapa 
            label,
            urlImage,
            recipe
        }
        userFavorite
            .create(dataToCreate)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static showFavorite(req, res, next) {
        userFavorite.find({userId : "5d27fdd80191d810d1cd1e18"}) // ini juga sama kasusnya harusnya dapet dari req header
        .populate()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = UserClass