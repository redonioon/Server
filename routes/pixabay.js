const router = require('express').Router()
const pixabayController = require('../controllers/pixabayController')

router.get('/search', pixabayController.search)

module.exports = router

