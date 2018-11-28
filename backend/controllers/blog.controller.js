const Blog = require('../models/Blog')
const User = require('../models/User')

exports.create = (req, res) => {
  const { thumbnail } = req.files
  let userId = ''
  const title = req.fields.title
  const tags = req.fields.tags.split(',')
  const content = req.fields.content
  const registerDate = new Date()
  const decoded = req.decoded
  const uploadImage = user => {
    userId = user._id
    if(!thumbnail) Promise.resolve()
    else return Blog.uploadFileToS3(thumbnail)
  }
  const create = location => {
    const post = {
      userId: userId,
      title: title,
      tags: tags,
      content: content,
      registerDate
    }
    if(location) post.thumbnail = location
    post.thumbnail = location
    return Blog.create(post)
  }
  const respond = response => res.json(response)
  const onError = () => res.status(500).json({ msg: '서버 에러' })
  
  User.findUserBy_id(decoded._id)
  .then(uploadImage)
  .then(create)
  .then(respond)
  .catch(onError)
}
exports.modify = (req, res) => {
  const { thumbnail } = req.files
  const _id = req.fields._id
  const title = req.fields.title
  const tags = req.fields.tags.split(',')
  const content = req.fields.content
  let exThumbnail = ''
  if(thumbnail) exThumbnail = req.fields.exThumbnail
  const uploadImage = file => {
    if(file) return Blog.uploadFileToS3(file)
    else return Promise.resolve() // Promise 객체로 return
  }
  const updatePost = location => {
    const post = {
      title: title,
      tags: tags,
      content: content
    }
    if(location) post.thumbnail = location
    return Blog.update(_id, post)
  }
  const deleteImage = () => {
    if(exThumbnail) return Blog.deleteFileFromS3(exThumbnail)
    else return Promise.resolve()
  }
  const respond = response => res.json(response)
  const onError = () => res.status(500).json({ msg: '서버 에러' })

  uploadImage(thumbnail)
  .then(updatePost)
  .then(deleteImage)
  .then(respond)
  .catch(onError)
}
exports.deletePost = (req, res) => {
  const { id } = req.query
  let post = '';
  const deletePostById = data => {
    post = data
    return Blog.delete(id)
  }
  const deleteImageFromS3 = data => {
    if(data.result.ok) return Blog.deleteFileFromS3(post.thumbnail)
  }
  const respond = response => res.json(response)
  const onError = () => res.status(500).json({ msg: '서버 에러' })

  Blog.findOnlyPostBy_id(id)
  .then(deletePostById)
  .then(deleteImageFromS3)
  .then(respond)
  .catch(onError)
}
exports.readAllPosts = (req, res) => {
  Blog.readAllPosts()
  .then(data => {
    res.json(data)
  })
}
exports.findPostBy_id = (req, res) => {
  const { id } = req.params
  Blog.findPostBy_id(id)
  .then(data => res.json(data[0]._id))
  .catch(() => res.status(404).json({ msg: '포스트가 없습니다' }))
}
exports.getTags = (req, res) => {
  const arrangeTags = tags => {
    const arrangedTags = tags.map(el => el.tags).reduce((acc, tag) => {
      if(tag in acc) acc[tag].count++;
      else {
        acc[tag] = {}
        acc[tag].count = 1
        acc[tag].name = tag
      }
      return acc
    }, {})
    return arrangedTags
  } 
  Blog.getTags()
  .then(tags => res.json(arrangeTags(tags)))
}
exports.findPostByTag = (req, res) => {
  const { tag } = req.params
  Blog.findPostByTag(tag)
  .then(data => res.json(data))
  .catch(err => res.status(500).json({ msg: '서버 에러' }))
}
exports.uploadImageFromContent = (req, res) => {
  const file = req.files
  Blog.uploadFileToS3(file.image)
  .then(location => res.json({location: location}))
  .catch(err => res.status(500).json(err))
}