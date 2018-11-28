const formidable = require('formidable')

exports.readFormData = (req, res, next) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    req.fields = fields
    req.files = files
    next()
  })
}