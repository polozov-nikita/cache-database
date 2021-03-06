const m = require('../index');

const collection = m.create('collection');

const addPromises = [];

for (let i = 0; i < 20; i++) {
  addPromises.push(collection.create({a: i, b: 'test'}));
};

Promise.all(addPromises)
  .then(() => {
    collection.findOne({a: 1})
      .then(data => console.log(data))
      .catch(error => {
        throw new Error(error);
      });
  })
