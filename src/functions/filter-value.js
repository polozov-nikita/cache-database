const getValueFromObj = require('./get-value-from-obj');

module.exports = (collection, key, search) =>
  collection.indexes[key].filter(item =>
    getValueFromObj(collection.documents[item], key) == search
  );
