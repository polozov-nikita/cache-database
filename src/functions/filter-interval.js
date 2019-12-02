const getValueFromObj = require('./get-value-from-obj');

const convert = (data, input) => {
  const type = typeof input;
  let output = data;
  switch (type) {
    case 'number':
      if (!isNaN(+data)) {
        output = Number(data);
      };
      break;
    case 'string':
      output = String(data);
      break;
    case 'boolean':
      output = Boolean(data);
      break;
    case 'object':
      if (!isNaN(Date.parse(data))) {
        output = new Date(data);
      } else {
        output = data;
      };
      break;
    default:
      output = data;
      break;
  };
  return output;
};

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
