---
title: '收藏'
description: 'Listing all collections'
---

<ul>
{% for item in collectionfolder.collectionsZhHans %}
  <li>
    <a href="/zh-Hans/collections/{{ item.collection.value | lastSegment }}/">
      {{ item.collectionLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
  
{% endfor %}
</ul>