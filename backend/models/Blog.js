const { ObjectId } = require('mongodb')
const DB = require('./Db')
const _dbName = 'blogs'
const AWS = require('aws-sdk')
const fs = require('fs')
AWS.config.region = 'ap-northeast-2';

const connectToDB = () => {
  return DB.connectClient()
  .then(DB.connectDB)
  .then(_db => DB.connectCollection(_db, _dbName))
}
const closeClientAndReturn = response => {
  DB.closeClient()
  return response
}
// const getFileName = name => name.substring(0, name.indexOf('.'))
const getFileType = type => type.substring(type.indexOf('/') + 1, type.length)

exports.uploadFileToS3 = file => {
  const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  const random = [...Array(25)].map(i=>chars[Math.random()*chars.length|0]).join('').toLowerCase();
  const param = {
    Bucket: 'storage.nerd.run',
    Key: `images/${random}-${Date.now()}.${getFileType(file.type)}`,
    ACL: 'public-read',
    Body: fs.createReadStream(file.path)
  }
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3()
    s3.upload(param, (err, data) => {
      if(err) reject(err)
      resolve(data.Location)
    })
  })
}
exports.deleteFileFromS3 = key => {
  const keyPath = key.substring(key.lastIndexOf('/') + 1, key.length);
  const param = {
    Bucket: 'storage.nerd.run',
    Key: `images/${keyPath}`
  }
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3()
    s3.deleteObject(param, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}
exports.create = post => {
  return connectToDB()
  .then(_col => _col.insertOne(post))
  .then(closeClientAndReturn)
}
exports.update = (id, post) => {
  return connectToDB()
  .then(_col => _col.updateOne({_id: new ObjectId(id)}, {$set: post}))
  .then(closeClientAndReturn)
}
exports.delete = id => {
  return connectToDB()
  .then(_col => _col.deleteOne({_id: new ObjectId(id)}))
  .then(closeClientAndReturn)
}
exports.readAllPosts = () => {
  return connectToDB()
  .then(_col => _col.aggregate([
      {
        $lookup: { 
          from: 'users', 
          localField: 'userId', 
          foreignField: '_id', 
          as: 'userInfo' 
        }
      },
      {
        $unwind: '$userInfo'
      }, 
      {
        $group: { 
          _id: {
            _id: '$userInfo._id', 
            email: '$userInfo.email', 
            nickname: '$userInfo.nickname',
            blog: {
              _id: '$_id', 
              title: '$title', 
              tags: '$tags',
              thumbnail: '$thumbnail',
              registerDate: '$registerDate'
            }
          }
        }
      }
    ]).toArray().then(closeClientAndReturn)
  )
}
exports.findOnlyPostBy_id = id => {
  return connectToDB()
  .then(_col => _col.findOne({_id: new ObjectId(id)}))
  .then(closeClientAndReturn)
}
exports.findPostBy_id = _id => {
  return connectToDB()
  .then(_col => _col.aggregate([
      { 
        $match: {
          _id: new ObjectId(_id) 
        }
      },
      {
          $lookup: { 
            from: 'users', 
            localField: 'userId', 
            foreignField: '_id', 
            as: 'userInfo' 
          }
        },
        {
          $unwind: '$userInfo'
        }, 
        {
          $group: { 
            _id: {
              _id: '$userInfo._id', 
              email: '$userInfo.email', 
              nickname: '$userInfo.nickname',
              blog: {
                _id: '$_id', 
                title: '$title', 
                tags: '$tags',
                content: '$content',
                thumbnail: '$thumbnail',
                registerDate: '$registerDate'
              }
            }
          }
        }
    ]).toArray().then(closeClientAndReturn)
  )
}
exports.getTags = () => {
  return connectToDB()
  .then(_col => _col.aggregate([
      { 
        $project: { 
          tags: 1 
        } 
      }, 
      { 
        $unwind: '$tags' 
      }
    ]).toArray().then(closeClientAndReturn)
  )
}
exports.findPostByTag = tag => {
  return connectToDB()
  .then(_col => _col.aggregate([
      { 
        $match : 
        { 
          tags: { 
            $in: [tag] 
          } 
        }
      },
      {
        $lookup: { 
          from: 'users', 
          localField: 'userId', 
          foreignField: '_id', 
          as: 'userInfo' 
        }
      },
      {
        $unwind: '$userInfo'
      }, 
      {
        $group: { 
          _id: {
            _id: '$userInfo._id', 
            email: '$userInfo.email', 
            nickname: '$userInfo.nickname',
            blog: {
              _id: '$_id', 
              title: '$title', 
              tags: '$tags',
              thumbnail: '$thumbnail',
              registerDate: '$registerDate'
            }
          }
        }
      }
    ]).toArray().then(closeClientAndReturn)
  )
}