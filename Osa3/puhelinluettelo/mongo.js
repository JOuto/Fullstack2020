const mongoose = require("mongoose");
const { text } = require("express");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name1 = process.argv[3];
const number1 = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.r6nyc.mongodb.net/persons-app??retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name1) {
  const person = new Person({
    name: name1,
    number: number1,
  });

  console.log(name1);
  person.save().then((result) => {
    console.log("Added", name1, number1, " to phonebook");
    mongoose.connection.close().catch((error) => console.log(error));
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((p) => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
}
