const mongoose = require('mongoose');


const uri = "mongodb+srv://admin:admin@cluster0-cl8w8.mongodb.net/noderest?retryWrites=true&w=majority";

//conectando ao banco de dados, passando parametro de forma de conectar
//mongoose.connect('mongodb://localhost/noderest', { useMongoClient : true });

mongoose.connect(uri, { useNewUrlParser: true });
//mongoose.createConnection('mongodb://localhost/noderest', { useNewUrlParser: true });

//mongodb+srv://admin:<password>@cluster0-cl8w8.mongodb.net/test?retryWrites=true&w=majority

//indicando a classe de promise que o mongoose vai usar

mongoose.Promise = global.Promise;
module.exports = mongoose;




// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
