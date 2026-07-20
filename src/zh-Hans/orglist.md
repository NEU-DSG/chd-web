---
title: '组织'
description: 'Listing all organizations'
slugOverride: 'orglist'
---

<ul>
{% for item in organizationfolder.organizationsZhHans %}
  <li>
    <a href="/zh-Hans/organizations/{{ item.organization.value | lastSegment }}/">
      {{ item.organizationLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>