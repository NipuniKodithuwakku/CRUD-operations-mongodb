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
    return await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name:1})
    .select({name:1,author:1})
    // console.log(courses)
}

async function run(){
    const courses = await getCourses();
    console.log(courses);

}


// getCourses();

run();
// Course
// .find({isPublished:true, tags:'backend'})
// .sort('name')//accending
// .sort('-name')//decending