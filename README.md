# cache-database

## Connection
```
  const cache = require('cache-database');
```
## Collections

### Create
```
  const collection = cache.create('collection');
```
## Documents

### Create
```
  collection.create({a: 1, b: 2, c: 3});
```
### Find

* Find all
```
  //Find all documents
  collection.find();
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */
  
```
* Find params
```
  //Find for documents where a == 1;
  collection.find({a: 1});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find for documents where a == 1, b == 2
  collection.find({a: 1, b: 2});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find for documents where a == 1, a == 2, a == 3
  collection.find({a: {$in: [1,2,3]}});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find for documents where a >= 1 and a <= 4
  collection.find({a: {$gte: 1, $lte:4}});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find for documents where a > 1 and a < 4
  collection.find({a: {$gt: 1, $lt:4}});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find all documents and skip fields b in documents
  collection.find({}, {b: 0});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find all documents and sorting field a
  collection.find({}, {}, {a: 1});
  //AND REVERSE
  collection.find({}, {}, {}, {a: -1});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Find for documents starting at 30 and limit output to 10 documents
  collection.find({}, {}, 30, 10);
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */
```
### Search
```
  //Full-text document search
  collection.search('test');
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document search where a == 1
  collection.search('test', {a: 1});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document search where a == 1, a == 2, a == 3
  collection.search('test', {a: {$in: [1,2,3]}});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document search where a >= 1 and a <= 4
  collection.search('test', {a: {$gte: 1, $lte:4}});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document search where a > 1 and a < 4
  collection.search('test', {a: {$gt: 1, $lt:4}});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document search and skip fields b in documents
  collection.search('test', {}, {b: 0});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document search and sorting field a
  collection.search('test', {}, {}, {a: 1});
  //AND REVERSE
  collection.search('test', {}, {}, {a: -1});
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */

  //Full-text document starting at 30 and limit output to 10 documents
  collection.search('test', {}, {}, 30, 10);
  /*
    Return Object type:
    {
      data: Array,
      search: Array,
      skip: Array,
      sort: Array,
      records: {
        all: Number,
        skip: Number || null,
        limit: Number || null,
      },
    }
  */
```
### Find One
```
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
```
### Update
```
  collection.findAndUpdate({a: 1}, {x: 10});
```
### Delete
```
  collection.findAndDelete({a: 1});
```