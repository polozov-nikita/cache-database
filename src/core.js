const storage = require('./storage');
const Collection = require('./collection');

class CacheDb {
  constructor() {};

  /**
   * @param {string} name - collection name
   * 
   * @return {Collection} collection Cache DB
   */
  create(name) {
    if (name && typeof name === 'string') {
      if (!storage.collections[name]) {
        storage.indexes[name] = {
          documents: [],
          indexes: {},
        };

        const collection = new Collection(name, storage.indexes[name]);
        storage.collections[name] = collection;

        return collection;
      } else {
        return storage.collections[name];
      };
    } else {
      throw new Error(`Missing required parameter 'name' or invalid parameter type.`);
    };
  };
};

module.exports = new CacheDb();
