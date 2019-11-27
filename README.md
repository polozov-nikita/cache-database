# cache-database

## Connection

const cache = require('cache-database');

## Collections

### Create

const collection = cache.create('collection');

## Documents

### Create

collection.create({a: 1, b: 2, c: 3});

### Find all

collection.find().exec();

### Find params

collection.find({a: 1}).exec();

### Search

collection.search('test').exec();

### Find One

collection.findOne({a: 1}).exec();

### Update

collection.findAndUpdate({a: 1}, {x: 10});

### Delete

collection.findAndDelete({a: 1});