const m = require('../index');

const collection = m.create('collection');

const addPromises = [];

for (let i = 0; i < 20; i++) {
  addPromises.push(collection.create({a: i, b: (i % 2 === 0) ? 'Предварительное' : null, c: {a: i + 2}}));
};

Promise.all(addPromises)
  .then(() => {
    //test 1
    collection.find()
      .then(data => {
        data.data.map(item => item.x = 1111);
        console.log('test 1');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //test 2
    collection.find({'a': 10})
      .then(data => {
        console.log('test 2');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //test 3
    collection.find({a: {$gte: 3, $lte: 6}})
      .then(data => {
        console.log('test 3');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //test 4
    collection.find({a: {$gt: 3, $lt: 6}})
      .then(data => {
        console.log('test 4');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //test 5
    collection.find({'c.a': {$in: [3,6]}})
      .then(data => {
        console.log('test 5');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //test 6
    collection.find({}, {}, {b: 1})
      .then(data => {
        console.log('test 6');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
    //test 7
    collection.find({b: null})
      .then(data => {
        console.log('test 7');
        console.log(data.data);
      })
      .catch(err => {
        throw new Error(err)
      });
  });
