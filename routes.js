const express = require('express');
const { ObjectID } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();

const mongoClient = new MongoClient("mongodb+srv://gleb:TlCARskmu9CGvz98@datastorage-mu2ho.mongodb.net",
    { useNewUrlParser: true, useUnifiedTopology: true });
 
let users, posts;

mongoClient.connect((err, client) => {
    if(err) return console.log(err);
    const db = client.db("egor");
    users = db.collection('users');
    posts = db.collection('posts');
    console.log("Подключились к бд...");
});

router.post('/login', (req, res) => {
    users.findOne(req.body)
         .then(data => {
            if (data) res.send({msg: "authorized"})
            else res.status(401).end()
         })
         .catch(err => {
            console.log(err);
            res.status(401).end();
         })
})

router.post('/get_all_data', (_, res) => {
    posts.find()
         .toArray()
         .then(data => res.send(data))
         .catch(err => {
            console.log(err);
            res.status(503).end();
         })
});

router.post('/get_data', (req, res) => {
   console.log(req.body)
    posts.findOne({_id: ObjectID(req.body.id)})
         .then(data => {
            if (data) res.send(data)
            else res.status(401).end()
         })  
         .catch(err => {
            console.log(err);
            res.status(503).end();
         })  
});

router.post('/delete_data', (req, res) => {
   console.log(req.body)
    posts.deleteOne({_id: ObjectID(req.body.id)})
         .then(data => {
            if (data) res.send({msg: "deleted"})
            else res.status(401).end()
         })  
         .catch(err => {
            console.log(err);
            res.status(503).end();
         })  
});

router.post('/change_data', (req, res) => {
   const {id, date, list} = req.body
   posts.updateOne({_id: ObjectID(id)}, { $set: {date, list} })
        .then(data => {
           if (data.modifiedCount > 0) res.send({msg: "updated"})
           else res.status(401).end()
        })  
        .catch(err => {
           console.log(err);
           res.status(503).end();
        })      
});

router.post('/create_data', (req, res) => {
    posts.insertOne(req.body)
         .then(data => {
            if (data) res.send({msg: "created"})
            else res.status(401).end()
         })  
         .catch(err => {
            console.log(err);
            res.status(503).end();
         })  
});
  
module.exports = router;