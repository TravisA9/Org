// npm install body-parser --save

const mongo = require('mongodb').MongoClient
const url = "mongodb://localhost:27017";


var bodyParser = require('body-parser')
// const bodyParser = require("raw-body");
const express = require('express');
const server = express();
const port = 8080;
const path = require('path')

console.log(path.join(__dirname,"/client"))
// server.use(express.static(__dirname + '/app/client'));
server.use(express.static(path.join(__dirname,"/client")));
// app.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.json())
// server.use('/api', cors(corsOptions), indexRouter);
////////////////////////////////////////////////////////////////////////////////
// server.get("/", (req, res) => {
//     res.sendFile(__dirname + '/client/index.html');
// });
server.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/client/index.html'));
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

    function get_results(err, result){
         if(err){ console.log(err); process.exit(0); }
         db.close();
         ret_results(result, node.ret, end)
     }

    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if(err) { console.log(err); process.exit(0); }
        var dbo = db.db('db'); // 'db'  'codeforgeek'
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
console.log(JSON.stringify(data))
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        for (var i = 0; i < data.length; i++) {
            console.log('item: ', i)
            var node = data[i]
            console.log(node)
            var collection = dbo.collection(node.db); // 'users'
            let end = (i == data.length-1)

            console.log("1");

        switch (node.task) {
            case "find":
            console.log(node.selector, node.update)
                collection.find(node.selector).project(node.update).toArray((err, result) => {
                    if(err){ console.log(err); process.exit(0); }
                    db.close();
                    ret_results(result, node.ret, end)
                });
                break;
            case "find_one":
                collection.findOne(node.selector, node.update, (err, result) => {
                     if(err){ console.log(err); process.exit(0); }
                     db.close();
                     ret_results(result, node.ret, end)
                 }); break;
            // case "find_many":
            case "update_one":
                collection.updateOne(node.selector, node.update, (err, result) => {
                    if(err) { console.log(err); process.exit(0); }
                    db.close();
                    ret_results(result, node.ret, end)
                }); break;
            case "delete_one":
                collection.deleteOne(node.selector, (err, result) => {
                    if(err) { console.log(err); process.exit(0); }
                    db.close();
                    ret_results(result, node.ret, end)
                }); break;
            case "insert_One": //
                collection.insertOne(node.update, (err, result) => {
                if (err) { console.log(err); process.exit(0); }
                console.log("2");
                db.close();
                console.log("3");
                ret_results(result, node.ret, end)
                }); break;
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
// 102
// petaquias
// 2
// grammer reading coprehention 12-2

// y6DF#4Ng
// antonio.flores@oup.com
