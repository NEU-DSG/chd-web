---
title: 'Collections by Subject'
description: 'Listing all collections'
permalink: "/en/collectionlist/by-subject/"
---
{%- set grouped = collectionfolder.collectionsEn | groupByMultiple("subject_list.value") %}

{% for entityUri, items in grouped %}
  <h3><a href="/en/terms/{{entityUri | lastSegment}}">{{ entityUri | labelFromUrl | capitalize }}</a></h3>
  <ul>
    {% for item in items %}
      <li><a href="/en/collections/{{item.collection.value | lastSegment}}">{{ item.collectionLabel.value }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}