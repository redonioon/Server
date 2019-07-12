const axios = require('axios')

const edamamApi = axios.create({
  baseURL: "https://api.edamam.com"
})

class ApiRecipeController {

  static searchRecipe(req, res, next) {
    edamamApi.get(`/search?q=${req.body.foodName}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
      .then(({ data }) => {
        if (data) {
          res.status(200).json(data)
        }else{
          res.status(404).json({
            msg : `Sorry we cant find any recipe for you`
          })
        }
      })
      .catch(next)
  }

}

module.exports = ApiRecipeController