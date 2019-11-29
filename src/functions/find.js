const FastClone = require('fastest-clone');

const filterValue = require('./filter-value');
const filterInterval = require('./filter-interval');
const filterSample = require('./filter-sample');
const getValueFromObj = require('./get-value-from-obj');

module.exports = (collection, searchKeys, isUpdate = false) => {
  if (searchKeys.length) {
    let documents = null;
    let interruptLabel = false;
    for (let search = 0, lengthSearch = searchKeys.length; search < lengthSearch; search++) {
      const typeSearchValue = typeof searchKeys[search].value;
      let range;
      if (typeSearchValue !== 'object') {
        range = filterValue(collection, searchKeys[search].key, searchKeys[search].value);
      } else {
        if (searchKeys[search].value.hasOwnProperty('$gte') || searchKeys[search].value.hasOwnProperty('$lte') || searchKeys[search].value.hasOwnProperty('$gt') || searchKeys[search].value.hasOwnProperty('$lt')) {
          range = filterInterval(collection, searchKeys[search].key, searchKeys[search].value);
        } else if (searchKeys[search].value.hasOwnProperty('$in') && Array.isArray(searchKeys[search].value.$in)) {
          range = filterSample(collection, searchKeys[search].key, searchKeys[search].value);
        } else {
          range = filterValue(collection, searchKeys[search].key, searchKeys[search].value);
        };
      };
      if (range.length) {
        if (!documents || range.length < documents.length) {
          documents = range;
        };
      } else {
        interruptLabel = true;
        documents = [];
        break;
      };
    };
    if (!interruptLabel) {
      if (searchKeys.length > 1) {
        const searchDocs = [];
        for (let i = 0, lengthDocuments = documents.length; i < lengthDocuments; i++) {
          let check = true;
          for (let search = 0, lengthSearch = searchKeys.length; search < lengthSearch; search++) {
            if (getValueFromObj(collection.documents[documents[i]], searchKeys[search].key) !== searchKeys[search].value) {
              check = false;
              break;
            };
          };
          if (check) {
            searchDocs.push(documents[i]);
          };
        };
        return !isUpdate
          ? FastClone.cloneArray(searchDocs.map(item => collection.documents[item]))
          : searchDocs;
      } else {
        return !isUpdate
          ? FastClone.cloneArray(documents.map(item => collection.documents[item]))
          : documents;
      };
    } else {
      return [];
    };
  } else {
    return !isUpdate
      ? FastClone.cloneArray(collection.documents)
      : [];
  };
};
