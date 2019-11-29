const functions = require('../documents/functions');

const create = (name) => {
  if (name && !global.cachedbStore[name]) {
    global.cachedbIndexes[name] = {
      documents: [],
      indexes: {},
    };
    global.cachedbStore[name] = {
      create: (document) => functions.create(global.cachedbIndexes[name], document),
      findOne: (search, skip) => functions.findOne(global.cachedbIndexes[name], search, skip),
      find: (search, skip, sorting, limit, pass) => functions.find(global.cachedbIndexes[name], search, skip, sorting, limit, pass),
      findAndDelete: (search) => functions.findAndDelete(global.cachedbIndexes[name], search),
      findAndUpdate: (search, document) => functions.findAndUpdate(global.cachedbIndexes[name], search, document),
      search: (textFullSearch, search, skip, sorting, limit, pass) => functions.search(global.cachedbIndexes[name], textFullSearch, search, skip, sorting, limit, pass),
    };
    return global.cachedbStore[name];
  };
};

module.exports = create;
