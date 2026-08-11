---
title: 'Collections by Material'
description: 'Listing all collections'
permalink: "/zh-Hans/collectionlist/by-material-general/"
---
{%- set grouped = collectionfolder.collectionsZhHans | groupByMultiple("material_types_general_list.value") %}

{% for entityUri, items in grouped %}
  <h3><a href="/zh-Hans/terms/{{entityUri | lastSegment}}">{{ termfolder.termSwitcher[entityUri | lastSegment].zhhans }}</a></h3>
  <ul>
    {% for item in items %}
      <li><a href="/zh-Hans/collections/{{item.collection.value | lastSegment}}">{{ item.collectionLabel.value }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}