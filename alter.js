//create an instance of Course class

//course create
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

//retrieve data from the database
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  //return a document
  const courses = await Course.find({ author: "Nipuni", isPublished: true })
    .find({ price: { $gte: 10, $lte: 20 } })
    // .find({price:{$in[10,15,20]} })
    .find()
    // .or([{author: "Nipuni"},{isPublished: true}])
    .and([{ author: "Nipuni" }, { isPublished: true }])

    //starts with Nipuni
    .find({ author: /^Nipuni/ })
    //ends with Nipuni i represent the case sensivity
    .find({ author: /Nipuni$/i })
    //contain in any position of the word
    .find({ author: /.*Nipuni.*/i })

    //pagination
    //in real world
    //api/courses?pageNumber=2&pageSize=10
    // .skip((pageNumber-1)*pageSize})
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  console.log(courses);
}
// createCourse();
getCourses();

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

updateCourse("5a68ff090c553064a218a547");
