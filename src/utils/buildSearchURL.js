const SITE_ID = "scmq7n";
const BASE = "https://api.searchspring.net/api/search/search.json";

export const buildSearchURL = (searchTerm = "", page = 1) => {
  const url = new URL(BASE);

  url.searchParams.set("siteId", SITE_ID);
  url.searchParams.set("q", searchTerm.trim());
  url.searchParams.set("resultsFormat", "native");
  url.searchParams.set("page", String(page));

  return url.toString();
};