const m = require('../index');

const collection = m.create('collection');

const addPromises = [];

for (let i = 0; i < 20; i++) {
  addPromises.push(collection.create({a: i, b: 'test'}));
};

Promise.all(addPromises)
  .then(() => {
    collection.findAndDelete({a: 0})
      .then(() => collection.find())
      .then(data => console.log(data.data))
      .catch(error => {
        throw new Error(error)
      });
  });
