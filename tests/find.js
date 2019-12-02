const m = require('../index');

const collection = m.create('collection');

const addPromises = [];

for (let i = 0; i < 20; i++) {
  addPromises.push(collection.create({a: i, b: (i % 2 === 0) ? 'Предварительное' : null, c: {a: i + 2}}));
};

Promise.all(addPromises)
  .then(() => {
    //
    collection.find()
      .then(data => {
        data.data.map(item => item.x = 1111);
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //
    collection.find({'a': 10})
      .then(data => console.log(data.data))
      .catch(err => {
        throw new Error(err)
      });
    //
    collection.find({a: {$gte: 3, $lte: 6}})
      .then(data => console.log(data.data))
      .catch(err => {
        throw new Error(err)
      });
    //
    collection.find({a: {$gt: 3, $lt: 6}})
      .then(data => console.log(data.data))
      .catch(err => {
        throw new Error(err)
      });
    //
    collection.find({'c.a': {$in: [3,6]}})
      .then(data => console.log(data.data))
      .catch(err => {
        throw new Error(err)
      });
    //
    collection.find({}, {}, {b: 1})
      .then(data => console.log(data.data))
      .catch(err => {
        throw new Error(err)
      });
  });
