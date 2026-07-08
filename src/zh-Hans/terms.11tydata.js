import EleventyFetch from "@11ty/eleventy-fetch";

export default {
  eleventyComputed: {
    referencedBy: async (data) => {
      const termUri = data.terms.term.value;
      const endpoint = "https://chd-dev-fuseki.library.northeastern.edu/chd";

      const query = `
PREFIX terms: <https://chinatowncollections.library.northeastern.edu/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?resource ?resourceLabel ?predicate

WHERE {
    ?resource ?predicate <${termUri}> ;
              rdfs:label ?resourceLabel .

    FILTER(lang(?resourceLabel) = "zh-Hans")
}

ORDER BY ?resourceLabel
      `;

      try {
        const result = await EleventyFetch(endpoint + "?cache=" + encodeURIComponent(termUri), {
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

        return result.results.bindings;
      } catch (err) {
        console.error("Fetch error:", err);
        return [];
      }
    },
  },
};