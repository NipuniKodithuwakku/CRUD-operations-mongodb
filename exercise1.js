const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, minlength: 5 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag",
    },
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js course",
    category: "web",
    author: "Mosh",
    tags: [],
    isPublished: true,
    price: 15,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  const result = await Course.find()
    .and([{ isPublished: true }, { tags: /.*backend.*/ }])
    .sort({ name: 1 })
    .select({ author: 1, name: 1 });
  console.log(result);
}
// getCourses();
createCourse();
