const router = require('express').Router()
const youtubeRouter =require('./youtubeRouter')
const userRouter = require('./userRouter')

router.use('/youtube',youtubeRouter)
router.use('/users',userRouter)
// router.use('/receipts')
// router.use('/nutrition')


module.exports = router