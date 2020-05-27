const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/text")
  .then(() => console.log("connected to the mongodb"))
  .catch((err) => console.error("could not connect to the mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
createCourse();
