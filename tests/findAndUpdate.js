const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 10; i++) {
  collection.create({a: i, b: 'test'});
};

console.log(collection.find().exec());
console.log('----UPDATE----');
collection.findAndUpdate({a: 0}, {b: 'ya'});
collection.findAndUpdate({a: 1}, {b: 'lala', c: 'lol'});
collection.findAndUpdate({b: 'test'}, {b: 'test1'});
console.log(collection.find().exec());