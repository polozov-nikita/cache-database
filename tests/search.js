const m = require('../index');

const collection = m.create('collection');

for (let i = 0; i < 20; i++) {
  collection.create({a: i, b: 'test'});
};

const t1 = collection.search(100).exec();
console.log(`find 100. OTPUT -> ${JSON.stringify(t1)} | Test -> ${JSON.stringify(t1) === '[]'}`);