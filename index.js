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
// async function updateCourse(id) {
//   const result = await Course.update(
//     { _id: id },
//     {
//       $set: {
//         author: "Nipuni",
//         isPublished: false,
//       },
//     }
//   );
//   console.log(result);
// }
// updateCourse("5a68ff090c553064a218a547");
async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}
deleteCourse("5a68ff090c553064a218a547");
