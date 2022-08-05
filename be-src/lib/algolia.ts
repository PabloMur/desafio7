import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliasearch("0URCNQXYHI", "c128a72141bfd708f12945d45d23949f");

// Create a new index and add a record
export const algoliaIndex = client.initIndex("pets");
// const record = { objectID: 1, name: "test_record" };
// index.saveObject(record).wait();

// // Search the index and print the results
// index.search("test_record").then(({ hits }) => console.log(hits[0]));
