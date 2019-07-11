const express = require('express')
const Router = express.Router()
const apiRecipe = require('../controllers/apiRecipe')

Router.post("/", apiRecipe.searchRecipe)
module.exports = Router