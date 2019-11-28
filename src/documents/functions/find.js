const functions = require('../../functions');

let skipRecord = null;
let limitRecord = null;

//final function
const exec = (collection, data, searchKeys, skipKeys, finding = true) => {
  let documents = finding ? functions.find(collection, searchKeys) : data;
  //skip records
  if (skipRecord) {
    if (skipRecord <= documents.length) {
      documents = documents.slice(skipRecord, documents.length);
    } else {
      documents = [];
    };
  };
  //limit
  if (limitRecord && documents.length > limitRecord) {
    documents = documents.slice(0, limitRecord);
  };
  //refresh
  skipRecord = null;
  limitRecord = null;
  if (skipKeys.length) {
    for (let i = 0, lengthDocuments = documents.length; i < lengthDocuments; i++ ) {
      for (let skip = 0, lengthSkip = skipKeys.length; skip < lengthSkip; skip++) {
        delete documents[i][skipKeys[skip]];
      };
    };
    return documents;
  } else {
    return documents;
  };
};

//sorting documents
const sort = (collection, sortKeys, searchKeys, skipKeys) => {
  const documents = functions.find(collection, searchKeys);
  //return
  return {
    exec: () => exec(
      collection,
      functions.sortingDocuments(documents, sortKeys),
      searchKeys,
      skipKeys,
      false,
    ),
  };
};

module.exports = (collection, search, skip, limit, pass) => {
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
  //check param <limit>
  if (limit) {
    if (typeof (limit) === 'number') {
      if (limit > 0) {
        limitRecord = limit;
      } else {
        throw new Error(`The limit record parameter must be greater than 0.`);
      };
    } else {
      throw new Error(`The limit record parameter must be of type "Number".`);
    };
  };
  //check param <pass>
  if (pass) {
    if (typeof (pass) === 'number') {
      if (pass > 0) {
        skipRecord = pass;
      } else {
        throw new Error(`The skip record parameter must be greater than 0.`);
      };
    } else {
      throw new Error(`The skip record parameter must be of type "Number".`);
    };
  };
  //return
  return {
    sort: (sorting) => {
      const sortKeys = [];
      //check param <sorting>
      if (sorting) {
        if (typeof(sorting) === 'object') {
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
      } else {
        throw new Error(`Missing required parameter "sorting".`);
      };
      return sort(
        collection,
        sortKeys,
        searchKeys,
        skipKeys,
      );
    },
    exec: () => exec(
      collection,
      [],
      searchKeys,
      skipKeys,
      true,
    ),
  };
};
