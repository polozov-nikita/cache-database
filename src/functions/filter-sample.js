const getValueFromObj = require('./get-value-from-obj');

module.exports = (collection, key, search) =>
  collection.indexes[key].filter(item =>
    search.$in.includes(getValueFromObj(collection.documents[item], key))
  );
