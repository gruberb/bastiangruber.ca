---
layout: base.njk
title: "Bastian Gruber — Staff Software Engineer & Rust Author"
description: "Staff Software Engineer at Mozilla and Rust Web Development author. Building services, cross-platform integrations and distributed systems, and leading teams from design to delivery."
hero:
  title: "Bastian Gruber"
  subtext: "Staff Software Engineer at Mozilla. Author of Rust Web Development."
image: '/images/me.png'
---
<section class="about-hero">
  <div class="about-hero__content">
    <img src="{{ image }}" alt="Bastian Gruber" class="about__image">
    <h1 class="about-hero__title">{{ hero.title }}</h1>
    <p class="about-hero__description">
      <strong>{{ hero.subtext }}</strong><br /><br />
      I build services and integrations that connect clients, backends and teams. My work spans privacy features in Firefox, production web services and distributed systems in Rust. I take projects from technical investigation and design through implementation, rollout and operation.
    </p>
  </div>
</section>
<section class="about-skills">
  <div class="about-skills__container">
    <div class="skills-grid">
      <div class="skill-card">
        <div class="skill-card__header">
          <svg class="skill-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          <h2 class="skill-card__title">What I build</h2>
        </div>
        <ul class="skill-card__list">
          <li><strong>Services and APIs:</strong> Rust and Python backends, with clear interfaces, staged rollouts and production monitoring.</li>
          <li><strong>Cross-platform integrations:</strong> shared Rust components, UniFFI bindings and C++ integration across Firefox desktop, Android and iOS.</li>
          <li><strong>Distributed systems:</strong> peer-to-peer protocols in Rust, node benchmarks and improvements to message-processing throughput.</li>
          <li><strong>End-to-end debugging:</strong> tracing requests across clients, gateways and services to understand failures and performance bottlenecks.</li>
        </ul>
      </div>
      <div class="skill-card">
        <div class="skill-card__header">
          <svg class="skill-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <h2 class="skill-card__title">How I lead</h2>
        </div>
        <ul class="skill-card__list">
          <li><strong>Own the technical outcome:</strong> turn an ambiguous problem into a design, an implementation plan and a working system.</li>
          <li><strong>Make cross-team work possible:</strong> agree on API contracts, clarify dependencies and sequence delivery so teams can build in parallel.</li>
          <li><strong>Stay close to the implementation:</strong> write and review code, build prototypes and debug the full path from client to backend.</li>
          <li><strong>Help other engineers succeed:</strong> explain difficult concepts, mentor through real projects and document the decisions behind the code.</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="about-content">
  <div class="about-content__container">
    <h2>Selected achievements</h2>
    <ul class="about-journey">
      <li><strong>Mozilla — privacy features across Firefox.</strong> Implemented Oblivious HTTP support in shared Rust components and the C++ integration for Firefox Desktop, enabling reuse across desktop, Android and iOS. Built and benchmarked an OHTTP gateway prototype against a real Firefox client. Contributed features and fixes to UniFFI, Mozilla's generator for calling Rust from other languages.</li>
      <li><strong>Mozilla — services from design to production.</strong> Led the Image Service project to consolidate duplicated image and favicon infrastructure. Led the Merino-side migration to a new advertising backend, defining the API contract and staged rollout across teams. Implemented core backend endpoints for Firefox's World Cup experience. Joined Mozilla in 2024 and was promoted to Staff Engineer in 2026.</li>
      <li><strong>Toposware — 10× higher message throughput per node.</strong> Helped build a permissionless distributed system using zero-knowledge proofs, with its peer-to-peer network implemented in Rust. Improved message throughput tenfold by profiling bottlenecks and optimizing batch processing and serialization. Led the internal benchmarking initiative. <a href="https://polygon.technology/blog/polygon-labs-acquires-toposware-leading-zk-engineering-startup-to-help-pioneer-next-wave-of-zk-technology">Polygon Labs acquired Toposware in 2024</a>.</li>
      <li><strong>Manning — teaching Rust through a published book.</strong> Wrote <a href="https://www.manning.com/books/rust-web-development"><em>Rust Web Development</em></a>, an end-to-end guide to building web services in Rust, with more than 4,800 copies sold. I'm now writing the second edition and working as a technical editor for Manning.</li>
      <li><strong>Twilio — architecture that customers could put into practice.</strong> One of the first Solutions Architects in the EMEA Professional Services team, later promoted to Senior Solutions Architect. Led technical engagements with Fortune 500 customers, developed prototypes and implementation plans, and guided teams through API integrations, architecture decisions and code reviews.</li>
      <li><strong>Earlier engineering — building products and modernizing services.</strong> At Kraken, migrated PHP services to Rust and shipped the first version of an automated KYC flow. Earlier work included IoT authentication at OSRAM, sensor-data services at Körber Digital, and migrating legacy PHP services to Node.js at GIATA. My career began with a web development company I co-founded while training as an electrician.</li>
      <li><strong>Writing, teaching and community.</strong> Founded Rust &amp; Tell Berlin, which grew to more than 1,000 members. At Mozilla, created and led Rusty Fridays, a practical course where engineers learned Rust by building a service together. I've written for publications including c't, iX, Macwelt and Golem, and published my first book, <em>OS X für Einsteiger</em>, in 2012.</li>
    </ul>
    <h2>Outside work</h2>
    <p>I live on Nova Scotia's South Shore with my wife and two children. I enjoy ultra running, comic books, philosophy and building small tools for my family and community. Curiosity, useful projects and good conversations run through both my work and my life.</p>
  </div>
</section>
