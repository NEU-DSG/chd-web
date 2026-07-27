---
title: 'Collections'
description: 'Listing all collections'
---
<ul>
{% for item in collectionfolder.collectionsEn %}
  <li>
    <a href="/en/collections/{{ item.collection.value | lastSegment }}/">
      {{ item.collectionLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
  
{% endfor %}
</ul>

<!-- {% if item.subject_list %}
      {% set subjects = item.subject_list.value | split("|") %}
      {% for subject in subjects %}
        <a href="/en/terms/{{ subject | lastSegment }}">{{ subject | labelFromUrl | capitalize}}</a><br>
      {% endfor %}
    {% endif %} -->