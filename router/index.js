const app = require('express').Router()
const getDb = require('../DB')
const mongo = require('mongodb')

// inser single data to mongo db
app.post('/insert', async (req, res) => {
  const data = req.body
  console.log(req.body['go '])
  getDb()
    .then(con => {
      return con.production.collection('h999i').insertOne({ data })
    })
    .then(row => {
      console.log(row.result)
      res.json({ data: row.ops })
    })
    .catch(err => {
      res.end({ insert: false })
      console.log(err)
    })
})

// fetching all inserted data
app.get('/getall', async (req, res) => {
  getDb()
  // for later implement query filtering
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
        console.log(r)
        res.send(r)
      }
    )
    .catch(err => {
      res.end({ singleFetch: false })
      throw err
    })
})

// update data
app.put('/edit/:id', (req, res) => {
  const id = new mongo.ObjectID(req.params.id)
  const itest = req.body.test
  // this notaition becaus i mistakenly add key with space
  const igo = req.body['go ']
  const ibuga = req.body.buga
  getDb()
    .then(
      r => {
        return r.production.collection('h999i').findOneAndUpdate(
          { _id: id },
          {
            $set:
            {
              'data.test': itest,
              // this notaition becaus i mistakenly add key with space
              'data.go ': igo,
              'data.buga': ibuga
            }
          },
          { returnOriginal: false }
        )
      }
    )
    .then(
      r => {
        console.log(r.message)
        res.send(r.value)
      }
    )
})
module.exports = app
