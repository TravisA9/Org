// npm install body-parser --save

const mongo = require('mongodb').MongoClient
const url = "mongodb://localhost:27017";


var bodyParser = require('body-parser')
const express = require('express');
const server = express();
const port = 8080;

server.use(express.static(__dirname + '/app'));
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.json())

////////////////////////////////////////////////////////////////////////////////
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});
////////////////////////////////////////////////////////////////////////////////
server.post("/db.json", (req, res) => {
    console.log("-----------------------------------");
    console.log(req.body);
    console.log("-----------------------------------");
    var user = {}
    user = req.body.user
    var data = req.body.requests
    var results = []

    function ret_results(result, ret, end) {  console.log('........',result)
        console.log('/// ret_results')
        results.push({ message: result, ret:ret })
        if(end == true){ console.log(user, '...sending response!')
            res.end(JSON.stringify(results));
        }
    }


    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if(err) { console.log(err); process.exit(0); }
        var dbo = db.db('db'); // 'db'  'codeforgeek'

        for (var i = 0; i < data.length; i++) {
            var node = data[i]
            var collection = dbo.collection(node.db); // 'users'
            let end = (i == data.length-1)

            // if(node.selector.cong == '_'){ node.selector.cong = user.cong; }


        switch (node.task) {
            case "signin":
                collection.find(node.selector).toArray((err, result) => {
                    if(err){ console.log(err); process.exit(0); }
                    db.close();
                    user.cong = result[0].cong;
                    // user.email = result[0].email;
                    ret_results(result, node.ret, end)
                });
                break;
            case "find":
                collection.find(node.selector).toArray((err, result) => {
                    if(err){ console.log(err); process.exit(0); }
                    db.close();
                    ret_results(result, node.ret, end)
                });
                break;
            case "find_one":
                collection.find(node.selector).toArray((err, result) => {
                     if(err){ console.log(err); process.exit(0); }
                     db.close();
                     ret_results(result, node.ret, end)
                 });
                 break;
            case "find_many":
            case "update_one":
            // collection.updateOne({name: 'Shahid'}, {'$set': {'name': 'Shahid Shaikh'}}, (err, results) => {
            //     if(err) { console.log(err); process.exit(0); }
            //     db.close();
            //     ret_results(result, node.ret, end)
            // });break;
            case "delete_one":
            // collection.deleteOne({name: 'Shahid'}, (err, results) => {
            //     if(err) { console.log(err); process.exit(0); }
            //     db.close();
            //     ret_results(result, node.ret, end)
            // });break;
            case "push":
            case "add_user":
            case "del_user":
            case "rm_user":

                break;
            default:

        }


    } //for loop

}); // mongo.connect
}); // server.post
////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
////////////////////////////////////////////////////////////////////////////////
