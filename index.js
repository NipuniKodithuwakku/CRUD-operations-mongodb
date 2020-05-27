const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/text")
  .then(() => console.log("connected to the mongodb"))
  .catch((err) => console.error("could not connect to the mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js course",
    author: "Mosh",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
async function getCourses() {
  // const pageNumber = 2;
  // const pageSize = 10;
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    // .skip((pageNumber - 1) * pageSize)
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find()
    //  .or([{ author: "Mosh" }, { isPublished: true }])
    // .and([{ author: "Mosh" }, { isPublished: true }])
    // .find({ author: /.*Mosh.*/ })
    // .limit(pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count();

  console.log(courses);
}
getCourses();
