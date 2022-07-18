"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
// hello_algolia.js
const algoliasearch_1 = require("algoliasearch");
// Connect and authenticate with your Algolia app
const client = (0, algoliasearch_1.default)("0URCNQXYHI", "c128a72141bfd708f12945d45d23949f");
// Create a new index and add a record
exports.index = client.initIndex("intro_algolia");
// const record = { objectID: 1, name: "test_record" };
// index.saveObject(record).wait();
// // Search the index and print the results
// index.search("test_record").then(({ hits }) => console.log(hits[0]));
