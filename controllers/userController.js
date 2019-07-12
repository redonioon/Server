const userModel = require('../models/userModel')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_API_KEY)

class UserClass {
    static signup(req, res, next) {
        let { username, email, password} = req.body
        let newUser = { username, email, password}

        userModel
            .create(newUser)
            .then((newUser)=>{
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        let { username, password} = req.body

        userModel
            .findOne({
                username: username
            })
            .then((found)=>{
                if(found){
                    if(compare(password, found.password)){
                        let payload = {
                            _id: found._id,
                            username: found.username,
                            email: found.email
                        }
                        let token = sign(payload)
                        res.status(200).json({token})
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
        client
            .verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_API_KEY
            })
            .then( (ticket) => {
                const { email } = ticket.getPayload()
                let newUserInfo = { 
                    username: 'redonion_' + email,
                    email: email,
                    password: 'redonion'
                }
                userModel
                    .create(newUserInfo)
                    .then((newUser)=>{
                        let payload = {
                            _id: newUser._id,
                            username: newUser.username,
                            email: newUser.email
                        }
                        let token = sign(payload)
                        res.status(200).json({
                            token: token
                        })
                    })
                    .catch(next)
            })
            .catch(next)
                    
    }
}

module.exports = UserClass