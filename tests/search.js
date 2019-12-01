const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 20; i++) {
  collection.create({a: i, b: 'test'});
};

collection.search(1)
  .then(data => console.log(data.data))
  .catch(error => {
    throw new Error(error);
  });
