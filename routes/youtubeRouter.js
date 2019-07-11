const router = require('express').Router()
const youtubeController = require('../controllers/youtubeController')

router.get('/getdata',youtubeController.getData)

router.get('/*',(req,res)=> {
    console.log('Oooops..')
})
module.exports = router