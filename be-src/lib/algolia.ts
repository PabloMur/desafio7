import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_SHORT_KEY,
  process.env.ALGOLIA_LONG_KEY
);

export const algoliaIndex = client.initIndex("pets");
