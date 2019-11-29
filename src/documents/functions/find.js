const functions = require('../../functions');

//final function
const exec = (collection, searchKeys, skipKeys, sortKeys, limitRecord, skipRecord) => {
  const output = {
    data: [],
    search: searchKeys,
    skip: skipKeys,
    sort: sortKeys,
    records: {
      all: 0,
      skip: skipRecord || null,
      limit: limitRecord || null,
    },
  };
  output.data = functions.find(collection, searchKeys);
  output.records.all = output.data.length;
  output.data = functions.sortingDocuments(output.data, sortKeys);
  //skip records
  if (skipRecord) {
    if (skipRecord <= output.data.length) {
      output.data = output.data.slice(skipRecord, output.data.length);
    } else {
      output.data = [];
    };
  };
  //limit
  if (limitRecord && output.data.length > limitRecord) {
    output.data = output.data.slice(0, limitRecord);
  };
  //skip keys
  if (skipKeys.length) {
    for (let i = 0, lengthDocuments = output.data.length; i < lengthDocuments; i++ ) {
      for (let skip = 0, lengthSkip = skipKeys.length; skip < lengthSkip; skip++) {
        delete output.data[i][skipKeys[skip]];
      };
    };
  };
  return output;
};

module.exports = (collection, search, skip, sorting, limit, pass) => {
  const searchKeys = [];
  const skipKeys = [];
  const sortKeys = [];
  //check param <search>
  if (search) {
    if (typeof(search) === 'object') {
      for (let field in search) {
        if (collection.indexes[field]) {
          if (searchKeys.map(item => item.key).indexOf(field) === -1) {
            searchKeys.push({
              key: field,
              value: search[field],
            });
          } else {
            throw new Error(`Met a second time field "${field}".`);
          };
        } else {
          throw new Error(`There is no field "${field}" in this collection.`);
        };
      };
    } else {
      throw new Error(`The search parameter must be of type "Object".`);
    };
  };
  //check param <skip>
  if (skip) {
    if (typeof(skip) === 'object') {
      for (let field in skip) {
        if (collection.indexes[field]) {
          if (skipKeys.indexOf(field) === -1) {
            skipKeys.push(field);
          } else {
            throw new Error(`Met a second time field "${field}".`);
          };
        } else {
          throw new Error(`There is no field "${field}" in this collection.`);
        };
      };
    } else {
      throw new Error(`The skip parameter must be of type "Object".`);
    };
  };
  //check param <limit>
  if (limit) {
    if (typeof (limit) === 'number') {
      if (limit <= 0) {
        throw new Error(`The limit record parameter must be greater than 0.`);
      };
    } else {
      throw new Error(`The limit record parameter must be of type "Number".`);
    };
  };
  //check param <pass>
  if (pass) {
    if (typeof (pass) === 'number') {
      if (pass <= 0) {
        throw new Error(`The skip record parameter must be greater than 0.`);
      };
    } else {
      throw new Error(`The skip record parameter must be of type "Number".`);
    };
  };
  //check param <sorting>
  if (sorting) {
    if (typeof (sorting) === 'object') {
      for (let field in sorting) {
        if (collection.indexes[field]) {
          if (sortKeys.map(item => item.key).indexOf(field) === -1) {
            sortKeys.push({
              key: field,
              way: sorting[field] === -1 ? -1 : 1,
            });
          } else {
            throw new Error(`Met a second time field "${field}".`);
          };
        } else {
          throw new Error(`There is no field "${field}" in this collection.`);
        };
      };
    } else {
      throw new Error(`The sorting parameter must be of type "Object".`);
    };
  };
  //return
  return exec(
    collection,
    searchKeys,
    skipKeys,
    sortKeys,
    limit,
    pass,
  );
};
