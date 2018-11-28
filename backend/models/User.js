const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const DB = require('./Db')
const crypto = require('crypto')
const _dbName = 'users'
const _crypto = require('../config/_cryption')
const _jwt = require('../config/_jwt')

const connectToDB = () => {
  return DB.connectClient()
  .then(DB.connectDB)
  .then(_db => DB.connectCollection(_db, _dbName))
}
const closeClientAndReturn = response => {
  DB.closeClient()
  return response
}

exports.create = (email, nickname, password, salt) => {
  return connectToDB()
  .then(_col => _col.insertOne({ email: email, nickname: nickname, password: password, salt: salt }))
  .then(closeClientAndReturn)
}
exports.findUserByEmail = email => {
  return connectToDB()
  .then(_col => _col.findOne({ email: email }))
  .then(closeClientAndReturn)
}
exports.findUserBy_id = _id => {
  return connectToDB()
  .then(_col => _col.findOne({ _id: new ObjectId(_id) }))
  .then(closeClientAndReturn)
}
// 비밀번호 salt 생성기
exports.randomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if(err) reject(err)
      resolve(buf)
    })
  })
}
// 비밀번호 암호화
exports.pdkdf2 = (buf, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, buf.toString(_crypto._encoding), _crypto._count, _crypto._bit, _crypto._crypto, (err, key) => {
      if(err) reject(err);
      const encryption = { salt: buf.toString(_crypto._encoding), key: key.toString(_crypto._encoding) }
      // return 은 salt 와 암호화된 password (key)
      resolve(encryption)
    })
  })
}
// 새로운 token 발행
exports.createToken = user => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user._id,
        email: user.email
      },
      _jwt._secret,
      {
        expiresIn: _jwt._date,
        issuer: _jwt._issuer,
        subject: _jwt._subject
      },
      (err, token) => {
        if(err) reject(err);
        resolve(token);
      }
    )
  });
}
// token 유효성 검사
exports.validate = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _jwt._secret, (err, decoded) => {
      if(err) reject({msg: 'invalid'});
      resolve(decoded);
    });
  });
}