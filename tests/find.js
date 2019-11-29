const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 20; i++) {
  collection.create({a: i, b: (i % 2 === 0) ? 'Предварительное' : null, c: {a: i + 2}});
};

console.log(collection.find().exec());

console.log(collection.find({'a': 10}).exec());

console.log(collection.find({a: {$gte: 3, $lte: 6}}).exec());

console.log(collection.find({a: {$gt: 3, $lt: 6}}).exec());

console.log(collection.find({'c.a': {$in: [3,6]}}).exec());

console.log(collection
  .find()
  .sort({b: 1})
  .exec()
);