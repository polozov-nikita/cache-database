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

module.exports = (collection, key, search) =>
  collection.indexes[key].filter(item => {
    if (collection.documents[item]) {
      const value = getValueFromObj(collection.documents[item], key);
      let output = true;
      if (search.$gte && convert(value, search.$gte) < search.$gte) {
        output = false;
      };
      if (search.$gt && convert(value, search.$gt) <= search.$gt) {
        output = false;
      };
      if (search.$lte && convert(value, search.$lte) > search.$lte) {
        output = false;
      };
      if (search.$lt && convert(value, search.$lt) >= search.$lt) {
        output = false;
      };
      return output;
    } else {
      return false;
    };
  });
