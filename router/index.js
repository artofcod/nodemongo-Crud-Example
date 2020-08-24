const app = require('express').Router()
const getDb = require('../DB')
const mongo = require('mongodb')

// inser single data to mongo db
app.post('/insert', async (req, res) => {
  // const data = req.body
  const {
    firstname,
    lastname,
    phone
  } = req.body

  getDb()
    .then(con => {
      return con.production.collection('person').insertOne({
        FirstName: firstname,
        LasName: lastname,
        Phone: phone
      })
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
  // r => r.production.collection('person').find({}, { 'data.test': 1 }).toArray()
    .then(
      r => r.production.collection('person').find({}).toArray()
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
      r => r.production.collection('person').find({ _id: mid }).toArray()
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
  const {
    firstname,
    lastname,
    phone
  } = req.body

  getDb()
    .then(
      r => {
        return r.production.collection('person').findOneAndUpdate(
          { _id: id },
          {
            $set:
            {
              FirstName: firstname,
              LasName: lastname,
              Phone: phone
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
      r => r.production.collection('person').findOneAndDelete({ _id: id })
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
