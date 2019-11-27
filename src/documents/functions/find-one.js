const functions = require('../../functions');

//filters records
const filter = (collection, key, search) => collection.indexes[key].filter(item => collection.documents[item] ? functions.getValueFromObj(collection.documents[item], key) == search : false);

//find documents
const find = (collection, searchKeys) => {
  if (searchKeys.length) {
    let documents = null;
    let interruptLabel = false;
    for (let search = 0, lengthSearch = searchKeys.length; search < lengthSearch; search++) {
      const range = filter(collection, searchKeys[search].key, searchKeys[search].value);
      if (range.length) {
        if (!documents || range.length < documents.length) {
          documents = range;
        };
      } else {
        interruptLabel = true;
        documents = [];
        break;
      };
    };
    if (!interruptLabel) {
      const searchDocs = [];
      if (searchKeys.length > 1) {
        for (let i = 0, lengthDocuments = documents.length; i < lengthDocuments; i++) {
          let check = true;
          for (let search = 0, lengthSearch = searchKeys.length; search < lengthSearch; search++) {
            if (functions.getValueFromObj(collection.documents[documents[i]], searchKeys[search].key) !== searchKeys[search].value) {
              check = false;
              break;
            };
          };
          if (check) {
            searchDocs.push(collection.documents[documents[i]]);
          };
        };
        return searchDocs;
      } else {
        for (let i = 0, lengthDocuments = documents.length; i < lengthDocuments; i++) {
          searchDocs.push(collection.documents[documents[i]]);
        };
        return searchDocs;
      };
    } else {
      return [];
    };
  } else {
    return collection.documents.filter(item => item !== null);
  };
};

//final function
const exec = (collection, searchKeys, skipKeys) => {
  const documents = find(collection, searchKeys);
  const document = documents.length ? documents[0] : null;
  //skip keys
  if (skipKeys.length && document) {
    for (let skip = 0, lengthSkip = skipKeys.length; skip < lengthSkip; skip++) {
      delete document[skipKeys[skip]];
    };
    return Object.assign({}, document);
  } else {
    return Object.assign({}, document);
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
