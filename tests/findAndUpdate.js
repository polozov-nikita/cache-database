const m = require('../index');

const collection = m.create('collection');

const addPromises = [];

for (let i = 0; i < 10; i++) {
  addPromises.push(collection.create({a: i, b: 'test'}));
};

Promise.all(addPromises)
  .then(() => {
    collection.findAndUpdate({a: 0}, {b: 'ya'})
      .then(() => collection.find())
      .then(data => console.log(data.data))
      .catch(error => {
        throw new Error(error);
      });
  });
