const express = require('express')
const {engine} = require('express-handlebars')
const res = require('express/lib/response')
const DB = require('./db')
const JPHandler = require('./handler')
const app = express()
const port = process.env.port || 5000
const db_connection = new DB()
app.set('view engine', 'handlebars')
let path

app.engine('handlebars', engine({
    defaultLayout: 'main'
}))

app.listen(port, ()=> console.log(`Listening on port  ${port}`))

app.use(express.static(__dirname + '/public'))

app.use((req,res) => {
    if(req.socket.localAddress != req.socket.remoteAddress){
       JPHandler.forbid(res)
    } else {
        switch(req.method){
            case 'GET':
                if(typeof(req.url) == 'string'){
                    path = req.url
                    switch(true){
                        case path.includes('/read'):
                            path = path.replace('/read', '')
                            if(path.includes('/')){
                                path = path.replace('/', '')
                            }
                            if(path == '') path = 'home'
                            db_connection.getContent(path, res)
                            break
                        case path.includes('/option'):
                            db_connection.getOptions(res)
                            break
                        case path.includes('navigation'):
                            db_connection.getMenu(res)
                            break
                        case path.includes('available-pages'):
                            db_connection.getPageList(res);
                            break;
                        case path == '/':
                            JPHandler.no(res)
                        default:
                            JPHandler.not_found(res)
                        break
                    }
                } else {
                    JPHandler.not_found(res)
                }
            break
            default:
                JPHandler.forbid(res)
            break
        }
    }

    
})



app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})



