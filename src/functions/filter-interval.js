const getValueFromObj = require('./get-value-from-obj');
const convert = require('./convert');

module.exports = (collection, key, search) => {
  return collection.indexes[key].filter(item => {
    const value = getValueFromObj(collection.documents[item], key);
    return !(
      ((search.$gte !== null) && (search.$gte !== undefined) && (convert(value, search.$gte) < search.$gte))
      ||
      ((search.$gt !== null) && (search.$gt !== undefined) && (convert(value, search.$gt) <= search.$gt))
      ||
      ((search.$lte !== null) && (search.$lte !== undefined) && (convert(value, search.$lte) > search.$lte))
      ||
      ((search.$lt !== null) && (search.$lt !== undefined) && (convert(value, search.$lt) >= search.$lt))
    );
  });
};
