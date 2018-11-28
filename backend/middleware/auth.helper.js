const User = require('../models/User')
exports.validate = (req, res, next) => {
  const token = req.headers['authorization'] || req.params.token
  console.log(token)
  if(token == 'null') res.status(403).json({ msg: '로그인이 필요합니다' })
  else {
    User.validate(token)
    .then(decoded => {
      req.decoded = decoded
      console.log(decoded)
      next()
    })
    .catch(err => res.status(409).json(err))
  }
}