import algoliasearch from "algoliasearch";

const client = algoliasearch("0URCNQXYHI", "c128a72141bfd708f12945d45d23949f");

export const algoliaIndex = client.initIndex("pets");
