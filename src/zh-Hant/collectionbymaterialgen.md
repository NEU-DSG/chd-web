---
title: 'Collections by Material'
description: 'Listing all collections'
permalink: "/zh-Hant/collectionlist/by-material-general/"
---
{%- set grouped = collectionfolder.collectionsZhHant | groupByMultiple("material_types_general_list.value") %}

{% for entityUri, items in grouped %}
  <h3><a href="/zh-Hant/terms/{{entityUri | lastSegment}}">{{ termfolder.termSwitcher[entityUri | lastSegment].zhhant }}</a></h3>
  <ul>
    {% for item in items %}
      <li><a href="/zh-Hant/collections/{{item.collection.value | lastSegment}}">{{ item.collectionLabel.value }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}