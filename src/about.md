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

<section class="about-content">
  <div class="about-content__container">
    <h2>Professional Journey</h2>
    <ul class="about-journey">
      <li>Started into Web Development at the age of 17, by starting my own web development company.</li>
      <li>Got a scholarship to study Computer Science from Allianz. Most notably, worked on IBM Mainframes as well as Java client applications.</li>
      <li>Moved to Berlin at the end of my studies to join my first StartUp.</li>
      <li>Worked in several StartUps as a frontend and backend developer, often times as the first of 5 employees.</li>
      <li>Started contracting for business ventures who wanted to start greenfield projects.</li>
      <li>Started MeetUps surrounding technology, the biggest was "Rust & Tell Berlin" with over 1k members.</li>
      <li>Worked across industries (IoT, Finance, Machine Learning StartUps, Travel & Leisure, Communications).</li>
      <li>Focussed on Rust since 2018, started a Blog, wrote and published a book with Manning, gave talks and interviews.</li>
      <li>Moved to Canada in 2023.</li>
      <li>Worked at a distributed systems StartUp, the solution we built got acquired by Polygon Labs.</li>
      <li>Joined Mozilla in June 2024, working with Rust, Python and JavaScript on components shipped directly in Firefox, and web services around Firefox.</li>
    </ul>
  </div>
</section>
