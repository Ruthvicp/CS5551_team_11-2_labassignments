/**
 * Created by Ruthvic on 03/27/2018.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://ruthvic:ruthvic@ds115569.mlab.com:15569/db1ase';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var objectId = require('mongodb').ObjectID;
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var cursor = db.collection('ruth_ase').find({"email":req.body.email});
        cursor.each(function(err,doc) {
            assert.equal(err,null);
            if(err)
            {
                res.write("RF");
            }
            if(doc != null)
            {
                res.write("UE");
                res.end();
            }else{
                insertDocument(db, req.body, function() {
                    res.write("Successfully inserted");
                    res.end();
                });
            }
        });
    });
})

app.get('/login', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var cursor = db.collection('ruth_ase').find({"email":req.body.email,"password":req.body.password});

        cursor.each(function(err,doc) {
            assert.equal(err,null);
            if(err)
            {
                res.write("RF");
            }
            if(doc != null)
            {

                MongoClient.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('ruth_ase').find().toArray(function(err, result) {
                        if (err) {
                            res.write("get Failed");
                            res.end();
                        } else {

                            res.send(JSON.stringify(result));
                        }
                        console.log("Got All Documents " + JSON.stringify(result));
                    });
                });

            }else{
                res.send("RNF");
            }
        });
    });
})

app.post('/login', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var cursor = db.collection('ruth_ase').find({"email":req.body.email,"password":req.body.password});

        cursor.each(function(err,doc) {
            assert.equal(err,null);
            if(err)
            {
                res.write("RNF");
            }
            if(doc != null)
            {

                MongoClient.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('ruth_ase').find().toArray(function(err, result) {
                        if (err) {
                            res.write("get Failed");
                            res.end();
                        } else {

                            res.send(JSON.stringify(result));
                        }
                        console.log("Got All Documents " + JSON.stringify(result));
                    });
                });

            }else{
                res.send("RNF");
            }
        });
    });
});

app.get('/getData', function (req, res) {


    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('ruth_ase').find().toArray(function(err, result) {
            if (err) {
                res.write("get Failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents " + JSON.stringify(result));
        });
    });


});

app.post('/update', function (req, res) {
    var item = {
        "fname": req.body.fname,
        "lname": req.body.lname,
        "email": req.body.email,
        "password": req.body.password
    }
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var id = req.body._id;
        db.collection('ruth_ase').updateOne({"_id": objectId(id)},{'$set':item}, {
                upsert: true
            },
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
});

app.post('/delete', function (req, res) {
    var id = req.body._id;
    console.log(id);
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        console.log(id);
        db.collection('ruth_ase').deleteOne({"_id": objectId(id)}, {
                upsert: true
            },
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
});

var insertDocument = function(db, data, callback) {
    db.collection('ruth_ase').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the users collection.");
        callback();
    });
};
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})