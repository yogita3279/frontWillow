const express = require('express');
const app = express();
const willowRoute = express.Router();

// Student model
let sellerData = require('../models/userSchema');

//<< db setup >>
const db = require("../db");
const dbName = "Willow";
const collectionName = "user";

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  // dbCollection.find().toArray(function(err, result) {
  //     if (err) throw err;
  //       console.log(result);
  // });

  // << db CRUD routes >>

  willowRoute.route('/').get((req, res) => {
    // sellerData.find((error, data) => {
    //   if (error) {
    //     return next(error)
    //   } else {
    //     res.json(data)
    //   }
    // })
    res.send("hello data");
  })
 
  
willowRoute.route('/create').post((request, response,next) => {
  const item = (request.body)  ;
  console.log(JSON.stringify(item));
  sellerData.create(item,(error,result)=>{
    if(error){
      return next(error)
    }else{
      dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
      response.json(result);
    });
    }
    response.json(result);
  })
  
  response.end()
});

}, function(err) { // failureCallback
  throw (err);
});








module.exports = willowRoute;
