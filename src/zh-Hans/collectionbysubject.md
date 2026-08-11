---
title: '按主题浏览馆藏'
description: 'Listing all collections'
permalink: "/zh-Hans/collectionlist/by-subject/"
---
{%- set grouped = collectionfolder.collectionsZhHans | groupByMultiple("subject_list.value") %}

{% for entityUri, items in grouped %}
  <h3><a href="/zh-Hans/terms/{{entityUri | lastSegment}}">{{ termfolder.termSwitcher[entityUri | lastSegment].zhhans }}</a></h3>
  <ul>
    {% for item in items %}
      <li><a href="/zh-Hans/collections/{{item.collection.value | lastSegment}}">{{ item.collectionLabel.value }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}