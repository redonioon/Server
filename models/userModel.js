const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, `Required input username`],
        validate: {
            validator: function (val) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({
                            username: val
                        })
                        .then((found) => {
                            if (found) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            },
            message: `Username has been used`
        }
    },
    email: {
        type: String,
        required: [true, `Required input email`],
        validate: [{
            validator: function (val) {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
                    throw `Invalid email Format`
                }
            }
        }, {
            validator: function (val) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({
                            email: val
                        })
                        .then((found) => {
                            if (found) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            },
            message: `Email has been used`
        }]
    },
    password: {
        type: String,
        required: [true, `Required input password`],
        minlength: [5, `Password too short`]
    }
})

userSchema.pre('save',function (next) {
    this.password = hash(this.password)
    next()
})

let User = mongoose.model('user', userSchema)

module.exports = User