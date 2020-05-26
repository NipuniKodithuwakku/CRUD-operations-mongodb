const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/text")
  .then(() => console.log("connected to the mongodb"))
  .catch((err) => console.error("could not connect to the mongodb", err));
