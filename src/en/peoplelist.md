---
title: 'People'
description: 'Listing all people'
slugOverride: 'peoplelist'
---

<ul>
{% for item in peopleEn %}
  <li>
    <a href="/en/people/{{ item.person.value | lastSegment }}/">
      {{ item.personLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>