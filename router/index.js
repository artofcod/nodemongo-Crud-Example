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

// fetching all inserted data
app.get('/getall', async (req, res) => {
  getDb()
    .then(
      r => r.production.collection('h999i').find({}).toArray()
    )
    .then(r => {
      console.log(r)
      res.send(r)
    })
    .catch(err => {
      throw err
    })
})

module.exports = app
