---
layout: base.njk
# Title and hero subtitle
hero:
  title: "Bastian Gruber"
  subtext: "Senior Software Engineer, meetup-organizer, and ultra-marathon enthusiast living on Nova Scotia’s South Shore."
# Main profile image, referenced once
image: '/images/me.png'
---

<section class="about-hero">
  <div class="about-hero__content">
      <img src="{{ image }}" alt="{{ name }}" class="about__image">
    <h1 class="about-hero__title">{{ hero.title }}</h1>
    <p class="about-hero__description">
        Software Craftsman, Ultra Runner and Tinkerer.
    </p>
  </div>
</section>
