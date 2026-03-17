---
layout: layout.njk
title: " - Books"
templateEngineOverride: njk,md
eleventyNavigation:
  key: Books
  order: 4
---
# Books by {{ author.penName }}

{% if books.length == 0 %}
Books coming soon! Check back for updates.
{% endif %}

{% for book in books %}
## {{ book.name }}
{% if book.series %}*{{ book.series }} Series*{% endif %}

{% if book.image %}<img src="{{ book.image }}" alt="{{ book.name }} Cover" style="max-width: 200px; height: auto;">{% endif %}

{% if book.description %}{{ book.description }}{% endif %}

{% if book.link and book.link != "/books/" %}[Buy Now]({{ book.link }}){% endif %}

{% endfor %}
