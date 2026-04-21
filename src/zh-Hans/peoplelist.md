---
title: '人们'
description: 'Listing all people'
slugOverride: 'peoplelist'
---

<ul>
{% for item in peopleZhHans %}
  <li>
    <a href="/zh-Hans/people/{{ item.person.value | lastSegment }}/">
      {{ item.personLabel.value }}
    </a>
  </li>
{% endfor %}
</ul>