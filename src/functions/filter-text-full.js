//convert document
const convert = (document) => {
  let param = '';
  for (let field in document) {
    switch (typeof document[field]) {
      case 'object':
        param += convert(document[field]);
        param += ' ';
        break;
      case 'number':
        param += String(document[field]);
        param += ' ';
        break;
      case 'string':
        param += String(document[field]).toLowerCase();
        param += ' ';
        break;
    };
  };
  return param;
};

module.exports = (documents, search) => {
  return new Promise((resolve, reject) => {
    resolve(
      documents
        .filter(item =>
          convert(item)
            .includes(search)
        )
    );
  });
};
