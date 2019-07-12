const axios = require('axios')
const baseURL = 'https://pixabay.com/api'
const APIkey = process.env.PIXABAY_API_KEY

class Controller {
    static search(req, res, next) {
        let searchQuery = ''
        if (req.query.searchImage.search(' ')!== -1) {
            searchQuery = req.query.searchImage.split(' ').join('+')
        } else {
            searchQuery = req.query.searchImage
        }
        axios
            .get(`${baseURL}/?key=${APIkey}&q=${searchQuery}&image_type=photo`)
            .then( ({data}) => {
                let arrOfImage = []
                for (var i=0; i<8; i++) {
                    arrOfImage.push(data.hits[i].webformatURL)
                }
                res.status(200).json(arrOfImage)
            })
            .catch(next)
    }
}

module.exports = Controller