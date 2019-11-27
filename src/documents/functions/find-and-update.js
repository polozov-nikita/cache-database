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
            searchDocs.push(documents[i]);
          };
        };
        return searchDocs;
      } else {
        for (let i = 0, lengthDocuments = documents.length; i < lengthDocuments; i++) {
          searchDocs.push(documents[i]);
        };
        return searchDocs;
      };
    } else {
      return [];
    };
  } else {
    return [];
  };
};

//final function
const exec = (collection, searchKeys, document) => {
  const documents = find(collection, searchKeys);
  for (let i = 0, length = documents.length; i < length; i++) {
    const _document = {
      ...collection.documents[documents[i]],
      ...document,
    };
    //delete on indexes
    for (let field in collection.indexes) {
      let key = collection.indexes[field].indexOf(documents[i]);
      if (key !== -1) {
        collection.indexes[field].splice(key, 1);
      };
    };
    //insert update document
    collection.documents[documents[i]] = _document;
    //created indexes
    functions.addIndexes(collection, documents[i]);
  };
  return;
};

module.exports = (collection, search, document) => {
  const searchKeys = [];
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
  } else {
    throw new Error(`Missing required parameter "search".`);
  };
  //check param <document>
  if (document) {
    if (typeof document !== 'object') {
      throw new Error(`The document parameter must be of type "Object".`);
    };
  } else {
    throw new Error(`Missing required parameter "document".`);
  };
  //return
  return exec(
    collection,
    searchKeys,
    document,
  );
};
