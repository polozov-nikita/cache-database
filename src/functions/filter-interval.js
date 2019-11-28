const getValueFromObj = require('./get-value-from-obj');

module.exports = (collection, key, search) => {
  return collection.indexes[key].filter(item => {
    if (collection.documents[item]) {
      let output = true;
      if (search.$gte && getValueFromObj(collection.documents[item], key) < search.$gte) {
        output = false;
      };
      if (search.$lte && getValueFromObj(collection.documents[item], key) > search.$lte) {
        output = false;
      };
      return output;
    } else {
      return false;
    };
  });
};
