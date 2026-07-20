---
title: 'People'
description: 'Listing all people'
slugOverride: 'peoplelist'
---

<ul>
{% for item in peoplefolder.peopleEn %}
  <li>
    <a href="/en/people/{{ item.person.value | lastSegment }}/">
      {{ item.personLabel.value }}
    </a>
    <p class="blurb"> {{ item.description.value }} </p>
  </li>
{% endfor %}
</ul>