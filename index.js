//load mongoose
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
  price: Number,
});

//classes,objects
//course,nodeCourse
//compile that schema into model
//model's first argument is singler name of the db collection

const Course = mongoose.model("Course", courseSchema);
//create an instance of Course class

async function updateCourse(id) {
  //approach:query first
  //find by id
  //modify its properties
  //save()

  const course = await Course.findById(id);
  if (!course) return;

  //update properties-method 1
  course.isPublished = true;
  course.author = "Anton Jkob";

  // //method-2
  // course.set({
  //   ispublished:true,
  //   author:'Anton Jkob'
  // });

  const result = await course.save();
  console.log(result);
}

updateCourse("5a68fdc3615eda645bc6bdec");
