const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 10; i++) {
  collection.create({a: i, b: 'test'});
};

collection.findAndUpdate({a: 0}, {b: 'ya'})
  .then(() => collection.find())
  .then(data => console.log(data.data))
  .catch(error => {
    throw new Error(error);
  });
