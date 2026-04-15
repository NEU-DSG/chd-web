import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    PREFIX onto: <https://chinatowncollections.library.northeastern.edu/onto/>
PREFIX prop: <https://chinatowncollections.library.northeastern.edu/properties/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <https://schema.org/>

SELECT ?organization ?organizationLabel ?description ?inception_year ?street_address ?coordinate_location 
?phone_number ?email_address ?organization_type ?date_of_dissolution ?neighborhood ?country
?official_website 
(GROUP_CONCAT(DISTINCT ?founder; separator="|") AS ?founders) 
(GROUP_CONCAT(DISTINCT ?founder_en; separator="|") AS ?founders_en) 
(GROUP_CONCAT(DISTINCT ?maintainer_of; separator="|") AS ?maintainer_of_list) 
(GROUP_CONCAT(DISTINCT ?maintainer_of_en; separator="|") AS ?maintainer_of_en_list) 
(GROUP_CONCAT(DISTINCT ?donor_for; separator="|") AS ?donor_for_list) 
(GROUP_CONCAT(DISTINCT ?donor_for_en; separator="|") AS ?donor_for_en_list) 
(GROUP_CONCAT(DISTINCT ?records_creator_for; separator="|") AS ?records_creator_for_list) 
(GROUP_CONCAT(DISTINCT ?records_creator_for_en; separator="|") AS ?records_creator_for_en_list)

WHERE {
    ?organization a onto:organization ;
        rdfs:label ?organizationLabel ;
        schema:description ?description . 
    FILTER (lang(?organizationLabel) = "zh-Hans")
    FILTER (lang(?description) = "zh-Hans")

    OPTIONAL {
        ?organization prop:inception_year ?inception_year .
    }

    OPTIONAL {
        ?organization prop:street_address ?street_address .
    }

    OPTIONAL {
        ?organization prop:coordinate_location ?coordinate_location .
    }

    OPTIONAL {
        ?organization prop:phone_number ?phone_number .
    }

    OPTIONAL {
        ?organization prop:email_address ?email_address .
    }

    OPTIONAL {
        ?organization prop:organization_type ?organization_type .
    }

    OPTIONAL {
        ?organization prop:date_of_dissolution ?date_of_dissolution .
    }

    OPTIONAL {
        ?organization prop:late ?neighborhood .
    }

    OPTIONAL {
        ?organization prop:country ?country .
    }

    OPTIONAL {
        ?organization prop:official_website ?official_website .
    }

    OPTIONAL {
        ?organization prop:founder ?founder_uri .
        ?founder_uri rdfs:label ?founder_en .
        FILTER(LANG(?founder_en) = "en")
        OPTIONAL {
            ?founder_uri rdfs:label ?founder_zh .
            FILTER(LANG(?founder_zh) = "zh-Hans")
        }
        BIND(COALESCE(?founder_zh, ?founder_en) AS ?founder)
    }

    OPTIONAL {
        ?organization prop:maintainer_of ?maintainer_of_uri .
        ?maintainer_of_uri rdfs:label ?maintainer_of_en .
        FILTER(LANG(?maintainer_of_en) = "en")
        OPTIONAL {
            ?maintainer_of_uri rdfs:label ?maintainer_of_zh .
            FILTER(LANG(?maintainer_of_zh) = "zh-Hans")
        }
        BIND(COALESCE(?maintainer_of_zh, ?maintainer_of_en) AS ?maintainer_of)
    }

    OPTIONAL {
        ?organization prop:donor_for ?donor_for_uri .
        ?donor_for_uri rdfs:label ?donor_for_en .
        FILTER(LANG(?donor_for_en) = "en")
        OPTIONAL {
            ?donor_for_uri rdfs:label ?donor_for_zh .
            FILTER(LANG(?donor_for_zh) = "zh-Hans")
        }
        BIND(COALESCE(?donor_for_zh, ?donor_for_en) AS ?donor_for)
    }

    OPTIONAL {
        ?organization prop:records_creator_for ?records_creator_for_uri .
        ?records_creator_for_uri rdfs:label ?records_creator_for_en .
        FILTER(LANG(?records_creator_for_en) = "en")
        OPTIONAL {
            ?records_creator_for_uri rdfs:label ?records_creator_for_zh .
            FILTER(LANG(?records_creator_for_zh) = "zh-Hans")
        }
        BIND(COALESCE(?records_creator_for_zh, ?records_creator_for_en) AS ?records_creator_for)
    }
}

GROUP BY ?organization ?organizationLabel ?description ?inception_year ?street_address ?coordinate_location 
?phone_number ?email_address ?organization_type ?date_of_dissolution ?neighborhood ?country
?official_website

  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=rdfzhhans", {
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

 