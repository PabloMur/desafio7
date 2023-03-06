import { algoliaIndex } from "../lib/algolia";

export async function searchPetsAround(lat, lng) {
  const { hits } = await algoliaIndex.search("", {
    aroundLatLng: `${lat},${lng}`,
    aroundRadius: 10000,
  });
  return hits;
}
