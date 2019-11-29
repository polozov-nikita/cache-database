const functions = require('../../functions');

//convert document
const convert = (document) => {
  let param = '';
  for (let field in document) {
    switch (typeof document[field]) {
      case 'object':
        param += convert(document[field]);
        param += ' ';
        break;
      case 'number':
        param += String(document[field]);
        param += ' ';
        break;
      case 'string':
        param += String(document[field]).toLowerCase();
        param += ' ';
        break;
    };
  };
  return param;
};

//find documents
const find = (documents, search) => {
  return documents.filter(item => convert(item).includes(search));
};

//final function
const exec = (collection, search, searchKeys, skipKeys, sortKeys, limitRecord, skipRecord) => {
  let documents = functions.find(collection, searchKeys);
  documents = find(documents, search);
  documents = functions.sortingDocuments(documents, sortKeys);
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
  //skip keys
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

module.exports = (collection, textFullSearch, search, skip, sorting, limit, pass) => {
  let searchParam;
  const searchKeys = [];
  const skipKeys = [];
  const sortKeys = [];
  //check param <textFullSearch>
  if (textFullSearch) {
    if (typeof(textFullSearch) === 'number' || typeof(textFullSearch) === 'string') {
      searchParam = String(textFullSearch).toLowerCase();
    } else {
      throw new Error(`The search parameter must be of type "String" || "Number".`);
    };
  } else {
    throw new Error(`Missing required parameter "search".`);
  };
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
    searchParam,
    searchKeys,
    skipKeys,
    sortKeys,
    limit,
    pass,
  );
};
