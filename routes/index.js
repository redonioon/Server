const router = require('express').Router()
const youtubeRouter =require('./youtubeRouter')


router.use('/youtube',youtubeRouter)

module.exports = router