//connect mongo db
const mongoose=require('mongoose');

monggose.connect('mongodb://localhost/playground')
//this connect method return a promise , so we call 'then' method
    .then(() => console.log('connected to the mongodb'))
    .catch((err) => console.error("couldn't connect to the mongodb",err));