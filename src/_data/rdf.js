import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const endpoint = "http://chinatown-fuseki-nlb-b8621274c3e5cc6b.elb.us-east-1.amazonaws.com/chd";
  const query = `
    # Define namespace/prefixes
PREFIX onto: <https://chinatowncollections.library.northeastern.edu/onto/>
PREFIX prop: <https://chinatowncollections.library.northeastern.edu/property/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <https://schema.org/>

# Select fields to return
SELECT ?organization ?organizationLabel ?description ?inception_year ?street_address ?coordinate_location 
?phone_number ?email_address ?organization_type ?date_of_dissolution ?neighborhood ?country
?official_website (GROUP_CONCAT(DISTINCT ?founder; separator=", ") AS ?founders) (GROUP_CONCAT(DISTINCT ?maintainer_of; separator=", ") AS ?maintainer_of_list) (GROUP_CONCAT(DISTINCT ?donor_for; separator=", ") AS ?donor_for_list) (GROUP_CONCAT(DISTINCT ?records_creator_for; separator=", ") AS ?records_creator_for_list)

# Query
WHERE {
    # Find all organizations, labels, and descriptions. These should all be available in English
    ?organization a onto:organization ;
        rdfs:label ?organizationLabel ;
        schema:description ?description . 
    # Filter for English
    FILTER (lang(?organizationLabel) = "en")
    FILTER (lang(?description) = "en")
    
    # Find all optional other fields
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
    	?organization prop:founder ?founder .
    }
  	
  	OPTIONAL {
    	?organization prop:maintainer_of ?maintainer_of .
  	}
  
  	OPTIONAL {
    	?organization prop:donor_for ?donor_for .
  	}
  
  	OPTIONAL {
    	?organization prop:records_creator_for ?records_creator_for .
  	}
  	
}

GROUP BY ?organization ?organizationLabel ?description ?inception_year ?street_address ?coordinate_location 
?phone_number ?email_address ?organization_type ?date_of_dissolution ?neighborhood ?country
?official_website

LIMIT 5
  `;
 
      try {
    const data = await EleventyFetch(endpoint + "?cache=rdf", {
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

 