//load mongoose
const mongoose = require("mongoose");

//connect mongodb
mongoose.connect("mongodb://localhost/playground");

//define document shape
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

//create a model(like a class)
const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select("name author price");
}

async function run() {
  const result = await getCourses();
  console.log(result);
}

run();
