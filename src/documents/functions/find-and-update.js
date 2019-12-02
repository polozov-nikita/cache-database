const functions = require('../../functions');

//final function
const exec = (collection, searchKeys, document) =>
  new Promise((resolve, reject) =>
    functions.find(collection, searchKeys, true)
      .then(documents => {
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
        resolve(true);
      })
      .catch(error => reject(error))
  );

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
