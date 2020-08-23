const app = require('express').Router()
const getDb = require('../DB')

// inser single data to mongo db
app.post('/insert', async (req, res) => {
  const data = req.body

  getDb()
    .then(con => {
      return con.production.collection('h999i').insertOne({ data })
    })
    .then(row => {
      console.log(row.result)
      res.json({ status: row.result, data: row.ops })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = app
