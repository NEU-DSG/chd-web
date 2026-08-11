---
title: '按維護者瀏覽館藏'
description: 'Listing all collections'
permalink: "/zh-Hant/collectionlist/by-maintainer/"
---

{%- set grouped = collectionfolder.collectionsZhHant | groupByMultiple("maintainer_list.value") %}

{% for entityUri, items in grouped %}
  <h3>
    {% if organizationfolder.organizationSwitcher[entityUri | lastSegment] %}
      <a href="/zh-Hant/organizations/{{ entityUri | lastSegment }}">
        {{ organizationfolder.organizationSwitcher[entityUri | lastSegment].zhhant }}
      </a>
    {% else %}
      <a href="/zh-Hant/people/{{ entityUri | lastSegment }}">
        {{ entityUri | lastSegment }}
      </a>
    {% endif %}
  </h3>

  <ul>
    {% for item in items %}
      <li>
        <a href="/zh-Hant/collections/{{ item.collection.value | lastSegment }}">{{ item.collectionLabel.value }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}