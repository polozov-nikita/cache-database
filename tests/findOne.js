const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 20; i++) {
  collection.create({a: i, b: 'test'});
};

console.log(collection.findOne({a: 1}));