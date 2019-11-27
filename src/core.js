const storeFunctions = require('./stor');
const collectionsFunctions = require('./collections');

class CacheDb {
  constructor() {
    //initial store
    storeFunctions.init();
  };

  create(name) {
    return collectionsFunctions.create(name);
  };
};

module.exports = new CacheDb();
