const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 20; i++) {
  collection.create({a: i, b: 'test'});
};

console.log(collection.find().exec());
console.log('----DELETE----');
collection.findAndDelete({a: 0});
collection.findAndDelete({a: 1});
console.log(collection.find().exec());