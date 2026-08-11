---
title: 'Collections by Maintainer'
description: 'Listing all collections'
permalink: "/en/collectionlist/by-creator/"
---

{%- set grouped = collectionfolder.collectionsEn | groupByMultiple("maintainer_list.value") %}

{% for entityUri, items in grouped %}
  <h3>
    {% if "organizations" in entityUri %}
      <a href="/en/organizations/{{ entityUri | lastSegment }}">
        {{ entityUri | labelFromUrl | capitalize }}
      </a>
    {% else %}
      <a href="/en/people/{{ entityUri | lastSegment }}">
        {{ entityUri | labelFromUrl | capitalize }}
      </a>
    {% endif %}
  </h3>

  <ul>
    {% for item in items %}
      <li>
        <a href="/en/collections/{{ item.collection.value | lastSegment }}">
          {{ item.collectionLabel.value }}
        </a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}