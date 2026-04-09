
import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    PREFIX prop: <https://chinatowncollections.library.northeastern.edu/properties/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?p ?pLabel WHERE {
    ?p rdfs:label ?pLabel .
    FILTER(LANG(?pLabel) = "zh-Hans")
    FILTER(STRSTARTS(STR(?p), STR(prop:)))
    }
  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=rdfzhhanslabels", {
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
      const uri = binding.p.value;
      const localName = uri.split("/").pop();
      labels[localName] = binding.pLabel.value;
    }
    return labels;
  } catch (err) {
    console.error("Fetch error:", err);
    return {};
  }
}

 