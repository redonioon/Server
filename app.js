const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routeApiRecipe = require('./routes/recipe')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use("/apiRecipe", routeApiRecipe)

app.use((err, req, res, next) => {
  const msg = err.message || 'Internal Server Error'
  const status = err.status || 500
  const resource = err.resource
  res.status(status).json({ msg, resource })
})


app.listen(port, () => console.log(`Server running in port : `, port))