const app = require('express').Router()
const getDb = require('../DB')
const mongo = require('mongodb')

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
      res.end({ insert: false })
      console.log(err)
    })
})

// fetching all inserted data
app.get('/getall', async (req, res) => {
  getDb()
  // r => r.production.collection('h999i').find({}, { 'data.test': 1 }).toArray()
    .then(
      r => r.production.collection('h999i').find({}).toArray()
    )
    .then(r => {
      console.log(r)
      res.send(r)
    })
    .catch(err => {
      res.end({ fetch: false })
      throw err
    })
})

// find single data
app.get('/getone/:id', (req, res) => {
  const id = req.params.id
  const mid = new mongo.ObjectID(id)
  getDb()
    .then(

      r => r.production.collection('h999i').find({ _id: mid }).toArray()
    )
    .then(
      r => {
        console.log('get one', r)
        res.send(r)
      }
    )
    .catch(err => {
      res.end({ singleFetch: false })
      throw err
    })
})

module.exports = app
