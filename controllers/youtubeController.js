const axios = require('axios')

class YoutubeController {
    static getData(req,res,next){
        let query = req.body.searched

        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&relevanceLanguage=en&type=video&key=AIzaSyC4sRtKylH-FvVTghi3PRO2rS-RMy63RLg`
        )
            .then(({ data })=> {
                console.log(data.items[0].id)
                res.status(200).json(data.items)
            })
            .catch((err)=> [
                console.log(err)
            ])
    }
}

module.exports = YoutubeController