---
title: 'Organizations'
description: 'Listing all organizations'
slugOverride: 'orglist'
---

<ul>
{% for item in organizationsEn %}
  <li>
    <a href="/en/organizations/{{ item.organization.value | lastSegment }}/">
      {{ item.organizationLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>