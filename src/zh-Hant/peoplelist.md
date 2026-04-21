---
title: '人們'
description: 'Listing all people'
slugOverride: 'peoplelist'
---

<ul>
{% for item in peopleZhHant %}
  <li>
    <a href="/zh-Hant/people/{{ item.person.value | lastSegment }}/">
      {{ item.personLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>