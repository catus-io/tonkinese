const router = require('express').Router()
const userController = require('./controllers/user.controller')
const blogController = require('./controllers/blog.controller')
const { readFormData } = require('./middleware/form.data.helper')
const { validate } = require('./middleware/auth.helper')

router
  .get('/user/:token', validate, userController.findUserById)
  .post('/register', userController.register)
  .post('/signin', userController.signin)
  .post('/blog', validate, readFormData, blogController.create)
  .put('/blog', validate, readFormData, blogController.modify)
  .delete('/blog', blogController.deletePost)
  .get('/blog/search/:tag', blogController.findPostByTag)
  .get('/blog/:id', blogController.findPostBy_id)
  .get('/blog', blogController.readAllPosts)
  .get('/tags', blogController.getTags)
  .post('/image', validate, readFormData, blogController.uploadImageFromContent)

module.exports = router