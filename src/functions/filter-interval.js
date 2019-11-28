const getValueFromObj = require('./get-value-from-obj');

module.exports = (collection, key, search) => {
  return collection.indexes[key].filter(item => {
    if (collection.documents[item]) {
      const value = getValueFromObj(collection.documents[item], key);
      let output = true;
      if (search.$gte && value < search.$gte) {
        output = false;
      };
      if (search.$lt && value > search.$lt) {
        output = false;
      };
      return output;
    } else {
      return false;
    };
  });
};
