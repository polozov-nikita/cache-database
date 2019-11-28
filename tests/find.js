const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 20; i++) {
  collection.create({a: i, b: 'test'});
};

console.log(collection.find().exec());

console.log(collection.find({'a': 10}).exec());