const express = require('express')
const app = express()

const cros = require('cors')
app.use(cros())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const morgan = require('morgan')
app.use(morgan('tiny'))

require('dotenv').config()

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log('server is running at http://localhost:' + process.env.PORT)
  } else {
    throw err
  }
})

// Test endpoin
app.get('/', (req, res) => {
  res.send('Welcome to the node and mongo crud ;) ')
})
