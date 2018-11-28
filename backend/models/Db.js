const { MongoClient, ObjectID } = require('mongodb')
const _db = require('../config/_db')
let _client = null

exports.connectClient = () => MongoClient.connect(_db.url, { useNewUrlParser: true })
exports.connectDB = client => {
  return new Promise((resolve, reject) => {
    _client = client
    if(_client) resolve(_client.db(_db.name))
    else reject(new Error({ msg: 'cannot access client' }))
  })
}
exports.connectCollection = (db, name) => {
  return new Promise((resolve, reject) => {
    resolve(db.collection(name))
  })
}
exports.getClient = () => _client
exports.closeClient = () => _client.close()