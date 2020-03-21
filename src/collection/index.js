const functions = require('../documents/functions');

class Collection {
	constructor(name, refStorage) {
		this.name = name;
		this.refStorage = refStorage;
	};

	create(document) {
		return functions.create(this.refStorage, document);
	};

	findOne(search, skip) {
		return functions.findOne(this.refStorage, search, skip);
	};

	find(search, skip, sorting, limit, pass) {
		return functions.find(this.refStorage, search, skip, sorting, limit, pass);
	};

	findAndDelete(search) {
		return functions.findAndDelete(this.refStorage, search);
	};

	findAndUpdate(search, document) {
		return functions.findAndUpdate(this.refStorage, search, document);
	};

	search(textFullSearch, search, skip, sorting, limit, pass) {
		return functions.search(this.refStorage, textFullSearch, search, skip, sorting, limit, pass);
	};
};

module.exports = Collection;
