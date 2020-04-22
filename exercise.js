const mongoose = require ('mongoose');

mongoose
.connect('mongodb://localhost/playground')
..then(() => {
    console.log("mongodb cnnected");
    
    
}).catch((err) => {
    console.error("couldn't connect to the db",err);
    
    
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date default: Date.now},
    isPublished: Boolean
});