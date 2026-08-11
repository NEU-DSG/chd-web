---
title: 'Collections by Maintainer'
description: 'Listing all collections'
permalink: "/zh-Hans/collectionlist/by-creator/"
---

{%- set grouped = collectionfolder.collectionsZhHans | groupByMultiple("maintainer_list.value") %}

{% for entityUri, items in grouped %}
  <h3>
    {% if organizationfolder.organizationSwitcher[entityUri | lastSegment] %}
      <a href="/zh-Hans/organizations/{{ entityUri | lastSegment }}">
        {{ organizationfolder.organizationSwitcher[entityUri | lastSegment].zhhans }}
      </a>
    {% else %}
      <a href="/zh-Hans/people/{{ entityUri | lastSegment }}">
        {{ entityUri | lastSegment }}
      </a>
    {% endif %}
  </h3>

  <ul>
    {% for item in items %}
      <li>
        <a href="/zh-Hans/collections/{{ item.collection.value | lastSegment }}">{{ item.collectionLabel.value }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}