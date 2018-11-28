const User = require('../models/User')
const _crypto = require('../config/_cryption')

exports.register = (req, res) => {
  const { email, nickname, password } = req.body
  const encryptPassword = user => {
    return new Promise((resolve, reject) => {
      if(user) reject({ msg: '해당 이메일이 이미 존재합니다' })
      else {
        User.randomBytes()
        .then(buf => User.pdkdf2(buf, password))
        .then(encryption => resolve(encryption))
      }
    })
  }
  const registerUser = encryption => {
    return new Promise((resolve, reject) => {
      if(!encryption) reject({ msg: '암호화 에러' })
      resolve(User.create(email, nickname, encryption.key.toString(_crypto._encoding), encryption.salt.toString(_crypto._encoding)))
    });
  }
  const respond = () => res.json({ msg: 1 })
  const onError = err => res.status(409).json({ msg: err.msg })

  User.findUserByEmail(email)
  .then(encryptPassword)
  .then(registerUser)
  .then(respond)
  .catch(onError)
}
exports.findUserById = (req, res) => {
  const { _id } = req.decoded
  User.findUserBy_id(_id).then(user => res.json(user)).catch(err => res.status(400).json(err))
}
exports.signin = (req, res) => {
  const { email, password } = req.body
  const comparePassword = user => {
    return new Promise((resolve, reject) => {
      if(!user) reject({ msg: '가입된 이메일이 없습니다' })
      else {
        User.pdkdf2(user.salt, password)
        .then(encryption => (encryption.key == user.password) ? resolve(user) : reject({ msg: '암호가 일치하지 않습니다' }))
      }
    })
  }
  const respond = token => res.json({ token: token })
  const onError = err => res.status(409).json({ msg: err.msg })
  User.findUserByEmail(email)
  .then(comparePassword)
  .then(User.createToken)
  .then(respond)
  .catch(onError)
}