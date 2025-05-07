class TestController {
    printText(req,res){
        res.send(req.query.text)
    }
}

module.exports = new TestController()