import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
PREFIX onto: <https://chinatowncollections.library.northeastern.edu/onto/>
PREFIX terms: <https://chinatowncollections.library.northeastern.edu/terms/>
PREFIX prop: <https://chinatowncollections.library.northeastern.edu/properties/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <https://schema.org/>
        
SELECT ?term ?termLabel ?description ?wikidata_correlate

WHERE {
    ?term a ?type ;
        rdfs:label ?termLabel ;
        schema:description ?description . 
  
  	OPTIONAL {
    	?term prop:wikidata_correlate ?wikidata_correlate .
    }	

    FILTER (STRSTARTS(STR(?term), STR(terms:)))
    FILTER (lang(?termLabel) = "zh-Hans")
    FILTER (lang(?description) = "zh-Hans")
}

ORDER BY ?termLabel

  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=termsZhHans", {
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
    return data.results.bindings;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

 