---
title: '人們'
description: 'Listing all people'
---

<ul>
{% for item in peoplefolder.peopleZhHant %}
  <li>
    <a href="/zh-Hant/people/{{ item.person.value | lastSegment }}/">
      {{ item.personLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>