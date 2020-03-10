const getValueFromObj = require('./get-value-from-obj');

const addIndexes = (path, collection, link, document) => {
  for (let field in document) {
    if (typeof document[field] !== 'object' || document[field] === null) {
      addIndex((path === '') ? field : `${path}.${field}`, collection, link);
    } else {
      addIndexes((path === '') ? field : `${path}.${field}`, collection, link, document[field]);
    };
  };
  return;
};

const addIndex = (path, collection, link) => {
  if (!checkIndex(path, collection)) {
    createIndex(path, collection);
    return collection.indexes[path].push(link);
  } else {
    if (collection.indexes[path].length > 1) {
      const search = {
        first: 0,
        last: collection.indexes[path].length,
      };
      while (search.first < search.last) {
        let mid = search.first + Math.floor((search.last - search.first) / 2);
        if (getValueFromObj(collection.documents[collection.indexes[path][mid]], path) > getValueFromObj(collection.documents[link], path)) {
          search.last = mid;
        } else {
          search.first = mid + 1;
        };
      };
      return collection.indexes[path].splice(search.last, 0, link);
    } else if (collection.indexes[path].length) {
      return (getValueFromObj(collection.documents[collection.indexes[path][0]], path) <= getValueFromObj(collection.documents[link], path))
        ? collection.indexes[path].push(link)
        : collection.indexes[path].splice(0, 0, link);
    } else {
      return collection.indexes[path].push(link);
    };
  };
};

const checkIndex = (path, collection) => {
  if (collection.indexes[path]) {
    return true;
  } else {
    return false;
  };
};

const createIndex = (path, collection) => collection.indexes[path] = [];

module.exports = (collection, link) => addIndexes('', collection, link, collection.documents[link]);
