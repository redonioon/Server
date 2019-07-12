const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.post('/login/google', userController.googleLogin)
router.post('/favorite',userController.favorite)
router.get('/favorite',userController.showFavorite)

module.exports = router