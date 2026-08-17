---
title: 'Collections by General Material'
description: 'Listing all collections'
permalink: "/en/collectionlist/by-material-general/"
---
{%- set grouped = collectionfolder.collectionsEn | groupByMultiple("material_types_general_list.value") %}

{% for entityUri, items in grouped %}
  <h3><a href="/en/terms/{{entityUri | lastSegment}}">{{ entityUri | labelFromUrl | capitalize }}</a></h3>
  <ul>
    {% for item in items %}
      <li><a href="/en/collections/{{item.collection.value | lastSegment}}">{{ item.collectionLabel.value }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}