const getValueFromObj = require('./get-value-from-obj');
const convert = require('./convert');

module.exports = (collection, key, search) =>
  collection.indexes[key].filter(item =>
    convert(getValueFromObj(collection.documents[item], key), search) == convert(search, search)
  );
