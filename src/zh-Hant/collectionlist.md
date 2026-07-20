---
title: '收藏'
description: 'Listing all collections'
slugOverride: 'collectionlist'
---

<ul>
{% for item in collectionfolder.collectionsZhHant %}
  <li>
    <a href="/zh-Hant/collections/{{ item.collection.value | lastSegment }}/">
      {{ item.collectionLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
  
{% endfor %}
</ul>