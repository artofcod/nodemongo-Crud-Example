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
      res.json({ data: row.ops })
    })
    .catch(err => {
      res.end({ insert: false })
      throw err
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
      res.send(r)
    })
    .catch(err => {
      res.end({ fetch: false })
      throw err
    })
})

// find single data
app.get('/getone/:id', (req, res) => {
  const mid = new mongo.ObjectID(req.params.id)

  getDb()
    .then(
      r => r.production.collection('h999i').find({ _id: mid }).toArray()
    )
    .then(
      r => {
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
        res.send(r.value)
      }
    )
    .catch(err => {
      res.end({ update: false })
      throw err
    })
})

// Delete a record
app.delete('/del/:id', (req, res) => {
  const id = mongo.ObjectID(req.params.id)

  getDb()
    .then(
      r => r.production.collection('h999i').findOneAndDelete({ _id: id })
    )
    .then(
      r => {
        res.send({ deleted: r })
      }
    )
    .catch(err => {
      res.end({ delete: false })
      throw err
    })
})
module.exports = app
