const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

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
  const result = await Course.find()
    .and([{ isPublished: true }, { tags: /.*backend.*/ }])
    .sort({ name: 1 })
    .select({ author: 1, name: 1 });
  console.log(result);
}
getCourses();
