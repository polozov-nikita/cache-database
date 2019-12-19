module.exports = (data, input) => {
  const type = typeof input;
  let output = data;
  switch (type) {
    case 'number':
      if (!isNaN(+data)) {
        output = Number(data);
      };
      break;
    case 'string':
      output = String(data);
      break;
    case 'boolean':
      output = Boolean(data);
      break;
    case 'object':
      if (!isNaN(Date.parse(data))) {
        output = new Date(data);
      };
      break;
  };
  return output;
};
