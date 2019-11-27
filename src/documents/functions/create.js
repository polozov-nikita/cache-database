const functions = require('../../functions');

//final function
const exec = (collection, document) => {
  const length = collection.documents.push(document);
  return functions.addIndexes(collection, length - 1);
};

module.exports = (collection, document) => {
  //check param <document>
  if (document) {
    if (typeof document !== 'object') {
      throw new Error(`The document parameter must be of type "Object".`);
    };
  } else {
    throw new Error(`Missing required parameter "document".`);
  };
  //return
  return exec(
    collection,
    document,
  );
};
