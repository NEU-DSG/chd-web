---
title: '組織'
description: 'Listing all organizations'
slugOverride: 'orglist'
---

<ul>
{% for item in organizationfolder.organizationsZhHant %}
  <li>
    <a href="/zh-Hant/organizations/{{ item.organization.value | lastSegment }}/">
      {{ item.organizationLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>