const JPHandler = require('./handler')

module.exports = class DB {
    constructor(){
        this.mysql = require('mysql2')
        this.config = require('./config')
        this.connection = this.initialize()
    }
    initialize(){
        return this.mysql.createPool(this.config.db)
    }

    getContent(path, res){
        this.getPageContents(path, res)
    }
    
    async getPageContents(path, res){
        if(!this.hasOwnProperty('connection') || typeof(this.connection == 'undefined')){
            this.initialize()
        }
        this.connection.execute("SELECT * FROM content where url=?", [path], function (err, result, fields) {
          if (err) throw err
          let result_set = []
          if(typeof(result) == 'object' && Object.keys(result).length){
            Object.keys(result).forEach(function(key){
                var row = result[key]
                row.content = row.content.replaceAll('\r\n', '')
                result_set[key] = row
              })
              JPHandler.result_handler(result_set[0], res)
          } else {
              JPHandler.not_found(res, '')
          }
          
        })
    }

    async getOptions(res){
        this.initialize()
        this.connection.query("SELECT * FROM options", function (err, result, fields) {
          if (err) throw err
          let result_set = {}
          Object.keys(result).forEach(function(key){
              var row = result[key]
              let optname = row.option_name
              result_set[optname] = row.value
          })
          JPHandler.result_handler(result_set, res)
        })
    }

    async getMenu(res){
        if(!this.hasOwnProperty('connection') || typeof(this.connection == 'undefined')){
            this.initialize()
            }
        this.connection.query("SELECT * FROM navigation where active=1", function (err, result, fields) {
        if (err) throw err
        JPHandler.result_handler(result, res)
      })
    }

    async getPageList(res, send = false){
        if(!this.hasOwnProperty('connection') || typeof(this.connection == 'undefined')){
            this.initialize()
            }
        this.connection.query("SELECT url FROM content", function (err, result, fields) {
        if (err) throw err
        let result_set = {}
        Object.keys(result).forEach(function(key){
            var row = result[key]
            result_set[key] = row.url
        })
        JPHandler.result_handler(result_set, res)
        })
    }
}