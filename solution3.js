//load mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);
async function getCourses() {
  return await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
}

async function run() {
  const result = await getCourses();
  console.log(result);
}

run();
