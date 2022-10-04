const express = require('express')
const apiRoutes = require('./routes/api-routes')
const htmlRoutes = require('./routes/html-routes')
const app = express()
// TODO: Require Exphbs

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// TODO: Add the handlebars setup code

app.use(express.static('public'))

app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

module.exports = app
