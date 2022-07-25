import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliasearch(
  process.env.ALGOLIA_SHORT_KEY,
  process.env.ALGOLIA_LONG_KEY
);

// Create a new index and add a record
export const index = client.initIndex("intro_algolia");
// const record = { objectID: 1, name: "test_record" };
// index.saveObject(record).wait();

// // Search the index and print the results
// index.search("test_record").then(({ hits }) => console.log(hits[0]));
