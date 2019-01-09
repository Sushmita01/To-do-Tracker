var express = require('express');
var router = express.Router();
const db=require("../db")
const collection= "todo";


/* Read */
router.get('/getAll', function(req, res, next) {
  db.getDB().collection(collection).find({}).toArray((err,documents)=> {
    if (err)  {
      console.log(err);
    }
    else {
      console.log(documents);
      res.json(documents);
    }
  })
});

/* Update */
router.put('/update/:id',(req,res)=> {
  const todoID=req.params.id;
  const userInput=req.body;
  db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(todoID)},{$set: {todo: userInput.todo}}, {returnOriginal:false}, (err,result)=> {
    if (err) console.log(err)
    else {
      // res.writeHead(200, {'Content-Type': 'text/plain'});
      res.json(result)
    }
      
  });
})

/* Create */
router.post('/add',(req,res)=> {
  const userInput=req.body;
  db.getDB().collection(collection).insertOne(userInput, (err,result)=> {
    if (err) console.log(err)
    else {
      // res.writeHead(200, {'Content-Type': 'text/plain'});
      res.json(result)
    }
  });
})

/*Delete*/
router.delete('/delete/:id',(req,res)=> {
  const todoID=req.params.id;
  db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(todoID)},(err,result)=> {
    if (err) console.log(err)
    else {
      // res.writeHead(200, {'Content-Type': 'text/plain'});
      res.json(result);
    }
  })
})

module.exports = router;
