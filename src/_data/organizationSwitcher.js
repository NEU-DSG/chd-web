
import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    PREFIX orgs: <https://chinatowncollections.library.northeastern.edu/organizations/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?o ?oLabelZhhans ?oLabelZhhant ?oLabelEn 
    WHERE {
        ?o rdfs:label ?oLabelZhhans .
        ?o rdfs:label ?oLabelEn .
        ?o rdfs:label ?oLabelZhhant .
        FILTER(LANG(?oLabelZhhans) = "zh-Hans")
        FILTER(LANG(?oLabelZhhant) = "zh-Hant")
        FILTER(LANG(?oLabelEn) = "en")
        FILTER(STRSTARTS(STR(?o), STR(orgs:)))
    }
  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=organizationSwitcher", {
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
      const localName = binding.o.value.split("/").pop();
      labels[localName] = {
        en: binding.oLabelEn.value,
        zhhans: binding.oLabelZhhans.value,
        zhhant: binding.oLabelZhhant.value,
      };
    }
    return labels;
    } catch (err) {
      console.error("Fetch error:", err);
      return {};
    }
}

 