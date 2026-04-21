---
title: '收藏'
description: 'Listing all collections'
slugOverride: 'collectionlist'
---

<ul>
{% for item in collectionsZhHans %}
  <li>
    <a href="/zh-Hans/collections/{{ item.collection.value | lastSegment }}/">
      {{ item.collectionLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>