import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    PREFIX terms: <https://chinatowncollections.library.northeastern.edu/terms/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?t ?tLabelZhhans ?tLabelZhhant ?tLabelEn 
    WHERE {
        ?t rdfs:label ?tLabelZhhans .
        ?t rdfs:label ?tLabelEn .
        ?t rdfs:label ?tLabelZhhant .
        FILTER(LANG(?tLabelZhhans) = "zh-Hans")
        FILTER(LANG(?tLabelZhhant) = "zh-Hant")
        FILTER(LANG(?tLabelEn) = "en")
        FILTER(STRSTARTS(STR(?t), STR(terms:)))
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
      const localName = binding.t.value.split("/").pop();
      labels[localName] = {
        en: binding.tLabelEn.value,
        zhhans: binding.tLabelZhhans.value,
        zhhant: binding.tLabelZhhant.value,
      };
    }
    return labels;
    } catch (err) {
      console.error("Fetch error:", err);
      return {};
    }
}

 