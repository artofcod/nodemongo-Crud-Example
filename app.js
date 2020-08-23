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

const router = require('./router')
app.use(router)

// database connecitng status
const database = require('./DB')
database().then(db => {
  console.log('connected to database')
})
  .catch(err => {
    if (err) {
      throw err
    }
  })

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log('\nserver is running at http://localhost:' + process.env.PORT)
  }
})

// Test endpoin
app.get('/', (req, res) => {
  res.send('Welcome to the node and mongo crud ;) ')
})
