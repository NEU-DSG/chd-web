---
title: 'About'
description: 'An English subpage'
slugOverride: 'about'
---

# Project Background
Boston's Chinatown is home to many community-oriented cultural and activist organizations. These organizations, along with many longtime neighborhood residents, hold a wealth of historical collections of photographs, newsletters, flyers, recorded interviews, maps, meeting minutes, and more. In addition, many area libraries, archives, and museums host collections pertaining to Chinatown's history. Together, this material tells a powerful and complex history, and access to them can enrich our understanding of this neighborhood's history.

In the spring of 2021, the Boston Research Center met with community partners including representatives from Boston Chinatown Neighborhood Center, Pao Arts Center, Chinese Historical Society of New England, the Chinatown Community Land Trust, the Chinatown Branch of the Boston Public Library, the Friends of the Chinatown Library, as well as author Dr. Michael Liu. In a series of planning meetings, our partners cited concerns that neighborhood historical materials are scattered throughout the city—some are accessible to the public, but even more are hidden. They further advised us that community members looking to learn more about their neighborhood history would benefit from a publicly accessible database linking relevant collections—a launching point for neighborhood research. These discussions also revealed that such an inventory could: contribute information to ongoing community projects, such as an interactive map about Chinatown's immigration history; identify items in need of preservation support; and establish partnerships for future collaborative efforts, including digitization projects. Our advisors also urged us to create a bilingual website, to ensure that the project was accessible to Boston's Chinatown community.

# Implementation
With these collective ambitions in mind, we worked with our community advisors to develop a survey, which has been made available in simplified and traditional Chinese script, as well as in English. We shared print and digital versions of this survey with repositories and community members, and over the course of 2021, gathered survey results to document archival collections held at universities and other repositories, blogs, art installations, personal collections, and other ways of documenting Chinatown's history.

We established data models for representing collections, organizations, and people in a structured way that would allow us to create a searchable and browsable directory of collections. In coming up with our data models and controlled vocabularies, we looked at similar projects, such as COURAGE, and consulted with archivists. BRC staff parsed and coded the initial survey responses according to these data models, following up with respondees to get additional information about their collections where necessary. Once the coding process was completed in English, we hired a translator to translate the relevant text into simplified Chinese.

The data was then loaded into a custom Wikibase instance. Wikibase is a free, open-source knowledge base software suite that can be used to represent multiple types of entities and the different types of relationships between them. We chose to use Wikibase due to the way it handles multilingual data, allowing us to easily store field names and values in English and Chinese, as well as the flexibility its schema provides, allowing us to potentially expand our project scope down the line to include entities such as events.

Finally, we developed a website that pulls in data from the Wikibase and presents it in a more user-friendly manner. The web interface for the project currently uses Snowman, a static site generator for SPARQL backends.

In the summer of 2022, the BRC collaborated with the Chinese Historical Society of New England (CHSNE) to hold design meetings with their stakeholders to gather their feedback about the Chinatown Collections Project. Dr. Heang Leung Rubin acted as the facilitator for this design meeting. The group provided feedback about ways to ensure the web project's accessibility, interactivity, and visual appeal for a variety of potential end-users, including neighborhood residents, community agencies, students, scholars, educators, and visitors to Chinatown.

In the next phase of this project, we plan to migrate this data into a CERES-supported site, which will include browsing capabilities and more sophisticated design.

# About the Boston Research Center
The Boston Research Center (BRC), based in the Northeastern University Library, is a digital community history and archives lab, built in partnership with the Boston Public Library. The BRC's mission is to help bring Boston's deep neighborhood and community histories to light through the creation and use of new technologies. Through these technologies, Boston residents can share the underrepresented stories from their community's past, as well as a deeper understanding of how this past shapes our present.

The BRC is hosted at Northeastern, but is designed to be a collaborative effort among many organizations in Boston—civic, research, teaching, and cultural heritage—devoted to developing institutional partnerships and fostering community engagement.

Funded in part by generous support from the Andrew W. Mellon Foundation and the National Endowment for the Humanities.