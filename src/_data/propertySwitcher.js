
import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    PREFIX prop: <https://chinatowncollections.library.northeastern.edu/properties/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?p ?pLabelEn ?pLabelZhhans ?pLabelZhhant WHERE {
      ?p rdfs:label ?pLabelEn .
      ?p rdfs:label ?pLabelZhhans .
      ?p rdfs:label ?pLabelZhhant
      
      FILTER(LANG(?pLabelEn) = "en")
      FILTER(LANG(?pLabelZhhans) = "zh-Hans")
      FILTER(LANG(?pLabelZhhant) = "zh-Hant")
      FILTER(STRSTARTS(STR(?p), STR(prop:)))
    }
  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=propertySwitcher", {
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
      const localName = binding.p.value.split("/").pop();
      labels[localName] = {
        en: binding.pLabelEn.value,
        zhhans: binding.pLabelZhhans.value,
        zhhant: binding.pLabelZhhant.value,
      };
    }
    return labels;
    } catch (err) {
      console.error("Fetch error:", err);
      return {};
    }
}

 