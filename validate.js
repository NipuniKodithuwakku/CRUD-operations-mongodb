const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/text")
  .then(() => console.log("connected to the mongodb"))
  .catch((err) => console.error("could not connect to the mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Angular.js course",
    author: "Mosh",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
async function getCourses() {
  const courses = await Course.find({ author: "Mosh", isPublished: true })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

createCourse();
