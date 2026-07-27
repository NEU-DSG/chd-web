---
title: 'Organizations'
description: 'Listing all organizations'
---

<ul>
{% for item in organizationfolder.organizationsEn %}
  <li>
    <a href="/en/organizations/{{ item.organization.value | lastSegment }}/">
      {{ item.organizationLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>