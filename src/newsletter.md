---
layout: ../_includes/layouts/base.njk
pageTitle: Newsletter Signup
templateEngineOverride: njk,md
eleventyNavigation:
  key: Newsletter
  order: 3
---
# Subscribe to {{ author.penName }}'s Newsletter

{% if author.newsletter and author.newsletter.embedCode %}
{{ author.newsletter.embedCode | safe }}
{% elif author.newsletter and author.newsletter.url %}
<p><a href="{{ author.newsletter.url }}" target="_blank" rel="noopener">Join the mailing list</a></p>
{% else %}
Newsletter signup coming soon! Check back later or contact {{ author.email }} to join the mailing list.
{% endif %}
