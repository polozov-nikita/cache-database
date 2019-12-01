const {Worker} = require('worker_threads');

module.exports = (path, data = {}) => {
  return new Promise((resolve, reject) => {
    const _worker = new Worker(path, {workerData: data});
    _worker.on('message', message => resolve(message));
    _worker.on('error', error => reject(error));
  });
};
