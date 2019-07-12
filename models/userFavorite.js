const mongoose = require('mongoose')
const Schema = mongoose.Schema

let favoriteSchema = new Schema ({
  userId : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  label : String,
  urlImage : String,
  recipe : []
})

let Favorite = mongoose.model('favorite', favoriteSchema)

module.exports = Favorite