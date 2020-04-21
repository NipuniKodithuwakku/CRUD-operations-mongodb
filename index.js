//connect mongo db
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  //this connect method return a promise , so we call 'then' method
  .then(() => console.log("connected to the mongodb"))
  .catch((err) => console.error("couldn't connect to the mongodb", err));

//we use schema to define  the shape of documents in mongodb
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  //give default value to the date property
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//classes,objects
//course,nodeCourse
//compile that schema to model
//first argument is singlar name of the db collection

const Course = mongoose.model("Course", courseSchema);
//create an instance of Course class

//since we use async we must put await into async function
async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Nipuni",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  //saving the course to the document in database
  //since this is an asynchronize activity we must use "await" keyword

  const result = await course.save();
  console.log(result);
}

//retrieve database from the database
async function getCourses() {
  //return a document
  const courses = await Course
    // .find({ author: "Nipuni", isPublished: true })
    // .find({price: {$gte: 10,$lte:20}})
    // .find({price:{$in[10,15,20]} })
    .find()
    // .or([{author: "Nipuni"},{isPublished: true}])
    .and([{author: "Nipuni"},{isPublished: true}])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
// createCourse();
getCourses();
