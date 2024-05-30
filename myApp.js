require('dotenv').config();

const { response } = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name: "Emma",
  age: 23,
  favoriteFoods: ["eggs", "fish", "fresh fruit"]
});

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

arrayOfPeople = [
  {name: "emy", age: 22, favoriteFoods: ["meat"] },
  {name: "stepper", age: 26, favoriteFoods: ["kele"] },
  {name: "collins", age: 27, favoriteFoods: ["chicken"] }
]
const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people)
  });
};

const findPeopleByName = (personName, done) => {

  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) =>{
    if (err) return console.log(err);
    done(null, foodFound)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) =>{
      if (err) return console.log(err);
    done(null, updatedPerson)
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) =>{
    if(err) return console.log(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (err, personRemove) => {
    if(err) return console.log(err);
    done(null, personRemove);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select(["name", "favoriteFoods"]).exec((err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
};
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
