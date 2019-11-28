const functions = require('../../functions');

//final function
const exec = (collection, searchKeys, skipKeys) => {
  const documents = functions.find(collection, searchKeys);
  const document = documents.length ? Object.assign({}, collection.documents[documents[0]]) : null;
  //skip keys
  if (document) {
    if (skipKeys.length) {
      for (let skip = 0, lengthSkip = skipKeys.length; skip < lengthSkip; skip++) {
        delete document[skipKeys[skip]];
      };
      return document;
    } else {
      return document;
    };
  } else {
    return null;
  };
};

module.exports = (collection, search, skip) => {
  const searchKeys = [];
  const skipKeys = [];
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
  //return
  return exec(
    collection,
    searchKeys,
    skipKeys,
  );
};
