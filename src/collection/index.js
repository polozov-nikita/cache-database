const functions = require('./functions');

function Response() {
  this.data = Array;
  this.search = Array;
  this.skip = Array;
  this.sort = Array;
  this.records = {
    all: Number,
    skip: Number,
    limit: Number,
  };
};

class Collection {
	constructor(name, refStorage) {
		this.name = name;
		this.refStorage = refStorage;
	};

	/**
	 * create document.
	 * 
	 * @param {object} document - document to be added to the database.
	 * 
	 * @return {Promise<any>} response.
	 * 
	 */
	create(document) {
		return functions.create(this.refStorage, document);
	};

	/**
	 * find one document.
	 * 
	 * @param {object} search - document search options.
	 * @param {object} skip - document fields to be omitted.
	 * 
	 * @return {Promise<any>} response.
	 * 
	 */
	findOne(search, skip) {
		return functions.findOne(this.refStorage, search, skip);
	};

	/**
	 * find documents.
	 * 
	 * @param {object} search - document search options.
	 * @param {object} skip - document fields to be omitted.
	 * @param {object} sorting - document sorting options.
	 * @param {number} limit - the right amount of documents.
	 * @param {number} pass - how many documents to skip.
	 * 
	 * @return {Promise<Response>} response.
	 * 
	 */
	find(search, skip, sorting, limit, pass) {
		return functions.find(this.refStorage, search, skip, sorting, limit, pass);
	};

	/**
	 * find and delete documents.
	 * 
	 * @param {object} search - document search options.
	 * 
	 * @return {Promise<any>} response.
	 * 
	 */
	findAndDelete(search) {
		return functions.findAndDelete(this.refStorage, search);
	};

	/**
	 * find and update documents.
	 * 
	 * @param {object} search - document search options.
	 * @param {object} document - new values document.
	 * 
	 * @return {Promise<any>} response.
	 * 
	 */
	findAndUpdate(search, document) {
		return functions.findAndUpdate(this.refStorage, search, document);
	};

	/**
	 * search documents.
	 * 
	 * @param {string} textFullSearch - full text search.
	 * @param {object} search - document search options.
	 * @param {object} skip - document fields to be omitted.
	 * @param {object} sorting - document sorting options.
	 * @param {number} limit - the right amount of documents.
	 * @param {number} pass - how many documents to skip.
	 * 
	 * @return {Promise<Response>} response.
	 * 
	 */
	search(textFullSearch, search, skip, sorting, limit, pass) {
		return functions.search(this.refStorage, textFullSearch, search, skip, sorting, limit, pass);
	};
};

module.exports = Collection;
