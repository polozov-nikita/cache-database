# cache-database

## Connection

  const cache = require('cache-database');

## Collections

### Create

  const collection = cache.create('collection');

## Documents

### Create

  collection.create({a: 1, b: 2, c: 3});

### Find

* Find all

  //Find all documents
  //Return Array documents
  collection.find().exec();

* Find params

  //Find for documents where a == 1;
  //Return Array documents
  collection.find({a: 1}).exec();

  //Find for documents where a == 1, b == 2
  //Return Array documents
  collection.find({a: 1, b: 2}).exec();

  //Find for documents where a == 1, a == 2, a == 3
  //Return Array documents
  collection.find({a: {$in: [1,2,3]}}).exec();

  //Find for documents where a >= 1 and a <= 4
  //Return Array documents
  collection.find({a: {$gte: 1, $lte:4}}).exec();

  //Find for documents where a > 1 and a < 4
  //Return Array documents
  collection.find({a: {$gt: 1, $lt:4}}).exec();

  //Find all documents and skip fields b in documents
  //Return Array documents
  collection.find({}, {b: 0}).exec();

  //Find all documents and sorting field a
  //Return Array documents
  collection.find().sort({a: 1}).exec();
  //AND REVERSE
  collection.find().sort({a: -1}).exec();

  //Find for documents starting at 30 and limit output to 10 documents
  //Return Array documents
  collection.find({}, {}, 30, 10).exec();

### Search

  //Full-text document search
  //Return Array documents
  collection.search('test').exec();

  //Full-text document search where a == 1
  //Return Array documents
  collection.search('test', {a: 1}).exec();

  //Full-text document search where a == 1, a == 2, a == 3
  //Return Array documents
  collection.search('test', {a: {$in: [1,2,3]}}).exec();

  //Full-text document search where a >= 1 and a <= 4
  //Return Array documents
  collection.search('test', {a: {$gte: 1, $lte:4}}).exec();

  //Full-text document search where a > 1 and a < 4
  //Return Array documents
  collection.search('test', {a: {$gt: 1, $lt:4}}).exec();

  //Full-text document search and skip fields b in documents
  //Return Array documents
  collection.search('test', {}, {b: 0}).exec();

  //Full-text document search and sorting field a
  //Return Array documents
  collection.search('test').sort({a: 1}).exec();
  //AND REVERSE
  collection.search('test').sort({a: -1}).exec();

  //Full-text document starting at 30 and limit output to 10 documents
  //Return Array documents
  collection.search('test', {}, {}, 30, 10).exec();

### Find One

  //Find document where a == 1;
  //Return document
  collection.findOne({a: 1});

  //Find document where a == 1, b == 2
  //Return document
  collection.findOne({a: 1, b: 2});

  //Find document where a == 1, a == 2, a == 3
  //Return document
  collection.findOne({a: {$in: [1,2,3]}});

  //Find document where a >= 1 and a <= 4
  //Return document
  collection.findOne({a: {$gte: 1, $lte:4}});

  //Find document where a > 1 and a < 4
  //Return document
  collection.findOne({a: {$gt: 1, $lt:4}});

  //Find document and skip fields b in documents
  //Return document
  collection.find({}, {b: 0});

### Update

  collection.findAndUpdate({a: 1}, {x: 10});

### Delete

  collection.findAndDelete({a: 1});