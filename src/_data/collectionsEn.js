import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
PREFIX onto: <https://chinatowncollections.library.northeastern.edu/onto/>
PREFIX prop: <https://chinatowncollections.library.northeastern.edu/properties/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <https://schema.org/>

# Select fields to return
SELECT ?collection ?collectionLabel ?description ?collection_type ?digitization_status ?access_restriction_status 
?access_policy_notes ?project_status ?project_start_year ?project_end_year ?materials_start_year ?materials_end_year
?official_website ?described_at_url ?related_collection
(GROUP_CONCAT(DISTINCT ?material_types_general; separator="|") AS ?material_types_general_list) 
(GROUP_CONCAT(DISTINCT ?material_types_specific; separator="|") AS ?material_types_specific_list) 
(GROUP_CONCAT(DISTINCT ?subject; separator="|") AS ?subject_list) 
(GROUP_CONCAT(DISTINCT ?language; separator="|") AS ?language_list) 
(GROUP_CONCAT(DISTINCT ?creator; separator="|") AS ?creator_list) 
(GROUP_CONCAT(DISTINCT ?maintainer; separator="|") AS ?maintainer_list) 
(GROUP_CONCAT(DISTINCT ?donor; separator="|") AS ?donor_list) 
(GROUP_CONCAT(DISTINCT ?contact; separator="|") AS ?contact_list) 

# Query
WHERE {
    # Find all organizations, labels, and descriptions. These should all be available in English
    ?collection a onto:chinatown_collection ;
        rdfs:label ?collectionLabel ;
        schema:description ?description . 
    # Filter for English
    FILTER (lang(?collectionLabel) = "en")
    FILTER (lang(?description) = "en")
    
    # Find all optional other fields
  	OPTIONAL {
    	?collection prop:collection_type ?collection_type .
    }

    OPTIONAL {
    	?collection prop:material_types_general ?material_types_general .
    }

    OPTIONAL {
    	?collection prop:material_types_specific ?material_types_specific .
    }

    OPTIONAL {
    	?collection prop:digitization_status ?digitization_status .
    }

    OPTIONAL {
    	?collection prop:access_restriction_status ?access_restriction_status .
    }

    OPTIONAL {
    	?collection prop:access_policy_notes ?access_policy_notes .
    	FILTER (lang(?access_policy_notes) = "en")
    }	

    OPTIONAL {
    	?collection prop:project_status ?project_status .
    	FILTER (lang(?project_status) = "en")
    }	

    OPTIONAL {
    	?collection prop:project_start_year ?project_start_year .
    }	

    OPTIONAL {
    	?collection prop:project_end_year ?project_end_year .
    }	

    OPTIONAL {
    	?collection prop:materials_start_year ?materials_start_year .
    }	

    OPTIONAL {
    	?collection prop:materials_end_year ?materials_end_year .
    }
  	
  	OPTIONAL {
    	?collection prop:subject ?subject .
  	}
    
    OPTIONAL { 
      ?collection prop:language ?language .
    }
  
  	OPTIONAL {
    	?collection prop:official_website ?official_website .
  	}
  
  	OPTIONAL {
    	?collection prop:described_at_url ?described_at_url .
  	}
    OPTIONAL {
    	?collection prop:creator ?creator .
    }	

    OPTIONAL {
    	?collection prop:maintainer ?maintainer .
    }
  	
  	OPTIONAL {
    	?collection prop:donor ?donor .
  	}
  
  	OPTIONAL {
    	?collection prop:contact ?contact .
  	}
  
  	OPTIONAL {
    	?collection prop:related_collection ?related_collection .
  	}
  	
}

GROUP BY ?collection ?collectionLabel ?description ?collection_type ?digitization_status ?access_restriction_status 
?access_policy_notes ?project_status ?project_start_year ?project_end_year ?materials_start_year ?materials_end_year
?official_website ?described_at_url ?related_collection
  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=collectionsEn", {
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

 