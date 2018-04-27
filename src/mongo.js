export default function(config) {
  var MongoClient = require('mongodb').MongoClient
  this.uri = 'mongodb://' + config.database.host + '/' + config.database.name
  this.connect = function(callback) {
    MongoClient.connect(this.uri, function (error, db) {
      return callback(error, db)
    })
  }
  /*
      Schedule an url retrieving
  */
  this.schedule = function(data) {
    if (!data.url) {
      throw new Error('No URL in object')
    }
    if (!data.user) {
      throw new Error('No User in object')
    }
    if (!data.ts) {
      throw new Error('No timestamp in object')
    }
    data.ts = new Date(data.ts * 1000)
    data.created = new Date()
    console.log(data)
    this.connect(function(err, db) {
      if (err) {
        throw new Error(err)
      }
      db.collection('scheduled').insert(data, null, function(error, results) {
        if (error) {
          throw new Error(error)
        }
        console.log('URL scheduled for parsing')
      })
    })
  }
}
