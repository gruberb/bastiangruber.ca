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
        Software Craftsman, Ultra Runner and Tinkerer. <br /><br />I love APIs, servers and building helpful tools - be it a 3D printed Soundbox for my Kids, helper websites for my friends and community, or solve technical challenges.
    </p>
  </div>
</section>
<section class="about-skills">
  <div class="about-skills__container">
    <div class="skills-grid">
      <!-- Technical Expertise Card -->
      <div class="skill-card">
        <div class="skill-card__header">
          <svg class="skill-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          <h3 class="skill-card__title">Technical Expertise</h3>
        </div>
        <ul class="skill-card__list">
          <li><strong>Rust</strong> - Published Author, working with Rust since 2018</li>
          <li><strong>Python</strong> - Web services serving thousands of requests a minute</li>
          <li><strong>JavaScript</strong> - Frontend + Backend, React, VueJS, NodeJS, TypeScript</li>
          <li><strong>Rust FFI</strong> targeting Python, Swift, Kotlin and JavaScript</li>
          <li>Built <strong>distributed P2P systems</strong> with low latency in Rust</li>
          <li><strong>Cloud Infrastructure</strong> - Docker, Kubernetes on AWS and Google Cloud</li>
          <li>Memory efficient <strong>data structures</strong></li>
          <li>Balance throughput and congestions in <strong>distributed systems</strong></li>
        </ul>
      </div>
      <!-- Unique Value Proposition Card -->
      <div class="skill-card">
        <div class="skill-card__header">
          <svg class="skill-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <h3 class="skill-card__title">Unique Value Proposition</h3>
        </div>
        <ul class="skill-card__list">
          <li>A <strong>doer</strong>, who dives deep and gets things done</li>
          <li>Both <strong>Greenfield</strong>, for StartUps in a very fast paced environment</li>
          <li>Maintaining, improving and refactoring <strong>legacy codebases</strong></li>
          <li>Contributed to large codebases like <strong>Firefox</strong></li>
          <li><strong>Problem solving</strong>: I am diving deep into a new problem, communicate my findings, and collaborate to reach the best outcome.</li>
          <li>Always having the <strong>endgoal</strong> of a task or product I built in mind.</li>
          <li> <strong>Know when </strong> to build for scale, when to prototype, when to ship fast and when to go slower</li>
        </ul>
      </div>
    </div>
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
