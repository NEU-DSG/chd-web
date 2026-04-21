---
title: '收藏'
description: 'Listing all collections'
slugOverride: 'collectionlist'
---

<ul>
{% for item in collectionsZhHant %}
  <li>
    <a href="/zh-Hant/collections/{{ item.collection.value | lastSegment }}/">
      {{ item.collectionLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>