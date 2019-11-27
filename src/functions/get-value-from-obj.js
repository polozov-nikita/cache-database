module.exports = (obj, field) => {
  const path = field.split('.');
  let value;
  for (let i = 0, length = path.length; i < length; i++) {
    if (i === 0) {
      value = obj[path[i]];
    } else {
      value = value[path[i]];
    };
  };
  return value;
};
