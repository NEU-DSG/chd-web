---
title: 'Collections'
description: 'Listing all collections'
slugOverride: 'collectionlist'
---

<ul>
{% for item in collectionsEn %}
  <li>
    <a href="/en/collections/{{ item.collection.value | lastSegment }}/">
      {{ item.collectionLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>