const router = require('express').Router()
const youtubeRouter =require('./youtubeRouter')
const userRouter = require('./userRouter')
const routeApiRecipe = require('./recipe')
const pixabayRouter = require('./pixabay')

router.use("/apiRecipe", routeApiRecipe)
router.use('/youtube',youtubeRouter)
router.use('/users',userRouter)
// router.use('/receipts')
// router.use('/nutrition')
router.use('/pixabay',pixabayRouter)

module.exports = router