const functions = require('../../functions');

//final function
const exec = (collection, searchKeys) =>
  new Promise((resolve, reject) =>
    functions.find(collection, searchKeys, true)
      .then(documents => {
        for (let i = 0, length = documents.length; i < length; i++) {
          //delete on collection
          collection.documents.splice(documents[i], 1);
          //delete on indexes
          for (let field in collection.indexes) {
            let key = collection.indexes[field].indexOf(documents[i]);
            if (key !== -1) {
              collection.indexes[field].splice(key, 1);
            };
            collection.indexes[field] = collection.indexes[field].map(item => item >= documents[i] ? item - 1 : item);
          };
        };
        resolve(true);
      })
      .catch(error => reject(error))
  );

module.exports = (collection, search) => {
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
  //return
  return exec(
    collection,
    searchKeys,
  );
};
