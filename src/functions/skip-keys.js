module.exports = (documents, skipKeys) =>
  new Promise((resolve, reject) => {
    if (skipKeys.length) {
      for (let i = 0, lengthDocuments = documents.length; i < lengthDocuments; i++) {
        for (let skip = 0, lengthSkip = skipKeys.length; skip < lengthSkip; skip++) {
          delete documents[i][skipKeys[skip]];
        };
      };
      resolve(documents);
    } else {
      resolve(documents);
    };
  });
