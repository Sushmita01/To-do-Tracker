const MongoClient=require('mongodb').MongoClient;
const ObjectID=require('mongodb').ObjectID;
const dbname="sampleDB";
const url="mongodb://localhost:27017";  //default Mongo URL
const mongoOptions= {useNewUrlParser: true};

const state = {
    db: null
}

//to make the connection from Node to Mongo
const connect= (callback) => {
    if (state.db) {                 //if we have a db connection
        callback();
    }
    else {                          //else make the connection
        MongoClient.connect(url,mongoOptions,(err,client)=> {
            if (err)
            callback(err);
            else{
                state.db=client.db(dbname);
                callback();
            }
        });
    }
}


const getPrimaryKey= (_id) => {
    return ObjectID(_id);  //id object used to query db by primary key

}

const getDB = () => {
    return state.db;  //returns current state of db
}

module.exports= {getDB,getPrimaryKey,connect}


