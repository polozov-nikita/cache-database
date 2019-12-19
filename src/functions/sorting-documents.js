const getValueFromObj = require('./get-value-from-obj');

const compare = (a, b, reverse = false) => {
  if (a === null || a === undefined || a === NaN) {
    a = '';
  };
  if (b === null || b === undefined || b === NaN) {
    b = '';
  };
  if (a < b) {
    return reverse ? 1 : -1;
  } else if (a > b) {
    return reverse ? -1 : 1;
  } else {
    return 0;
  };
};

/**
 * Функция множественной сортировки
 * @prop {Array[document]} documents - элементы. default value -> []
 * @prop {Array[itemSorting]} sorting - правила сортировки. default value -> []
 * @field {Object} document - документ.
 * @field {Object} itemSorting - правило сортировки. Пример {key: 'id', way: 1}. Где key -> название сортируемого поля. way -> направление сортировки: 1 -> от меньшего к большему, -1 -> от большего к меньшему. По-умолчанию key = 1. 
 */
module.exports = (documents = [], sorting = []) =>
  new Promise((resolve, reject) => {
    let output = documents;
    for (let sort = 0, length = sorting.length; sort < length; sort++) {
      if (sort === 0) {
        output = output.sort((a, b) => compare(
          getValueFromObj(a, sorting[sort].key),
          getValueFromObj(b, sorting[sort].key),
          sorting[sort].way === -1 ? true : false,
        ));
      } else {
        let store = [];
        let startCrop = 0;
        //создание массивов для сортировки n-го уровня
        for (let i = 1, lengthOutput = output.length; i < lengthOutput; i++) {
          if (getValueFromObj(output[i], sorting[sort - 1].key) !== getValueFromObj(output[i - 1], sorting[sort - 1].key) && i !== lengthOutput - 1) {
            store.push(output.slice(startCrop, i));
            startCrop = i;
          } else if (i === lengthOutput - 1) {
            store.push(output.slice(startCrop));
          } else {
            continue;
          };
        };
        //сортировка n уровня
        for (let i = 0, lengthStore = store.length; i < lengthStore; i++) {
          store[i].sort((a, b) => compare(
            getValueFromObj(a, sorting[sort].key),
            getValueFromObj(b, sorting[sort].key),
            sorting[sort].way === -1 ? true : false,
          ));
        };
        //обновление output
        output = [].concat(...store);
      };
    };
    resolve(output);
  });
