module.exports = class JPHandler {
    static result_handler(result, res, status = 200, type='text/json') {
        if(Object.keys(result).length){
            res.type(type)
            res.status = status
            res.send({data: result})
        } else{
            this.not_found(res, '')
        }
    }

    static not_found(res, message = '404 - Not Found'){
        res.type('text/plain')
        res.status(404)
        res.send(message)
    }

    static no(res){
        res.type('text/plain')
        res.status(406)
        res.send()
    }

    static forbid(res){
        res.status(403)
        res.send()
    }
}