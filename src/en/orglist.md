---
title: 'Organizations'
description: 'Listing all organizations'
slugOverride: 'orglist'
---

<ul>
{% for item in rdf %}
  <li>
    <a href="/en/organizations/{{ item.organization.value | lastSegment }}/">
      {{ item.organizationLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>