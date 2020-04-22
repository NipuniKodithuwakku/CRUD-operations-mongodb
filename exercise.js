const mongoose = require ('mongoose');

mongoose
.connect('mongodb://localhost/playground');
// .then(() => {
//     console.log("mongodb cnnected");
    
    
// }).catch((err) => {
//     console.error("couldn't connect to the db",err);
    
    
// });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model("Course",courseSchema);

async function getCourses(){
    const courses = await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name:1})
    .select({name:1,author:1})
    console.log(courses)
}

getCourses();


// Course
// .find({isPublished:true, tags:'backend'})
// .sort('name')//accending
// .sort('-name')//decending