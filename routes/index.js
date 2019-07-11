const router = require('express').Router()
const youtubeRouter =require('./youtubeRouter')
const userRouter = require('./userRouter')
const routeApiRecipe = require('./recipe')

router.use("/apiRecipe", routeApiRecipe)
router.use('/youtube',youtubeRouter)
router.use('/users',userRouter)
// router.use('/receipts')
// router.use('/nutrition')


module.exports = router