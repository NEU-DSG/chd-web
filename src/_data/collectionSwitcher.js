
import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    PREFIX coll: <https://chinatowncollections.library.northeastern.edu/collections/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?c ?cLabelZhhans ?cLabelZhhant ?cLabelEn 
    WHERE {
        ?c rdfs:label ?cLabelZhhans .
        ?c rdfs:label ?cLabelEn .
        ?c rdfs:label ?cLabelZhhant .
        FILTER(LANG(?cLabelZhhans) = "zh-Hans")
        FILTER(LANG(?cLabelZhhant) = "zh-Hant")
        FILTER(LANG(?cLabelEn) = "en")
        FILTER(STRSTARTS(STR(?c), STR(coll:)))
    }
  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=collectionSwitcher", {
      duration: "1d",
      type: "json",
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/sparql-query",
          Accept: "application/sparql-results+json",
        },
        body: query,
      },
    });
    
  // Build a lookup
    const labels = {};
    for (const binding of data.results.bindings) {
      const localName = binding.c.value.split("/").pop();
      labels[localName] = {
        en: binding.cLabelEn.value,
        zhhans: binding.cLabelZhhans.value,
        zhhant: binding.cLabelZhhant.value,
      };
    }
    return labels;
    } catch (err) {
      console.error("Fetch error:", err);
      return {};
    }
}

 