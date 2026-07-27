---
title: '人们'
description: 'Listing all people'
---

<ul>
{% for item in peoplefolder.peopleZhHans %}
  <li>
    <a href="/zh-Hans/people/{{ item.person.value | lastSegment }}/">
      {{ item.personLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>