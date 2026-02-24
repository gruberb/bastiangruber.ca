---
title: I freaking love the new tools I built for myself
description: Building with Claude is a real joy and empowerment.
permalink: posts/{{ title | slug }}/index.html
date: '2026-02-24'
tags: [building]
---

## How It All Started

My entry into programming was at 16, when friend came over to my house and told me about one of our neighbours, who was building websites, and even selling them (can you believe that?!) to small businesses. We looked at the websites and thought: We can do that better.

The way I entered the field might be how I always act, or it defined how I approach this craft: I want to build solutions to problems. I was never the one who could dabble deep into programming languages and nerd out on syntax or object-oriented vs. functional etc. For me, the endgoal was always priority. With more time in the field, I also cared about HOW I build these solutions, and HOW the code and structure looks like.

A few years forward, and I found myself in the StartUp world in Berlin. I loved the pace, the atmosphere, and the building, pivoting, trying out new tools to solve problems faster and better. Working at a company didn't satisfy my lust for exploring, so I wanted to develop my ideas outside of work. The city always provided enough UX/UI people to partner and tinker with. None of the toy projects ever succeeded, but that was not the point, really.

## A New Chapter: Family Meets LLMs

Life changes, I have a family now, went through the first hard years of being a parent, and I slowly feel more free time to explore this lust of building and solving problems. Now, in this phase, the tech ecosystem throws new tools my way to help me exactly with that: LLMs.

Was it more or less "meh" in the beginning, since Claude Opus 4.5, I can really thrive.

## The Pool Dashboard

For example, we have a local community pool where I live now, and there website is hard to read, and the schedule hard to decipher. I am part of a parent WhatsApp group and the complains were every week the same: "I stood in front of the pool and it was closed", "Can someone tell me if the pool is actually open?".

Well, on one of these afternoons, between doing the dishes, prepping the day for my Kids, I threw the problem into Claude, gave it the website with the hard-to-read schedule, and told it to build a very basic, bare bones dashboard with YES/NO if the pool is open. I didn't look at the website yet, I just wanted a prototype and a first idea if it works. 5 minutes later it found the API call to for the JSON the website is getting, and build a very basic HTML/CSS website. I fed it more features, saw more edge cases, adjusted the code, gave it more guidelines. And fast forward one hour later, instead of answering to the WhatsApp group "I think it is", [I posted a link for the website](https://isthelclcpoolopen.ca/). While Claude was working, I purchased the domain, set up a GitHub CI/CD pipeline, set up GitHub pages, and then merged it all together.

It was fun, exhilarting, and reminded me of the pure joy I felt when I was younger. Could I have done it myself? Oh absolutely. But not in 45mins while I had to do 5 different things. For these debugging sessions, I need a notebook, a quiet place to think and bounce back and forth until I have a working example. Fun if you have all the time in the world, not so fun if you have 2 kids in the background who have priority (at least, most of the time).

## The NHL Playoff Dashboard

The list goes on. A few months later, friends of mine wanted to start a NHL Playoff Fantasy team. We picked the teams, our friend forwarded the free website he set it up. And it was - aweful. I thought: I can do it better! Span up Claude inside Zed, and with the help of GitHub repos for unofficial NHL API documentation, span up a [fully functional, live score and live data NHL dashboard](https://fantasy-frontend.fly.dev/) for the playoffs, with each of our teams and players. It took about a week to get right, but without the help of the LLM, I would have taken so much longer (and probably lost interest) in setting up all the edge cases, details, parse API responses which were not documented etc. 

## Building Tools for Every Day

With the time, the tools got better, and I can finally build tools I can - and want to - use every day. I always wanted a seamless writing experience in the browser without logins and complex UI. So I built [WorkLedger](https://workledger.org/). I am using it every day now for a week and it truly changed my workday. After that, I was tired of keeping my Brag Document in a Google Doc, so I build a fully customizable work stream "collector" called [Brag Frog](https://brag-frog.org/), which syncs all my resources into one place, and I can prep meetings, add items to OKRs and let myself draft a self review every half year based on all the work I am doing from across 7 different platforms.

I can open source this work, it runs fairly cheap on a fly.io instance. The static websites either run on GitHub or Vercel. It is fast and easy to setup and ship.

## What About Quality?

And for the quality? My god, you can really fine tune and throw stuff at Claude Opus 4.6. The [Brag Fox project](https://github.com/gruberb/brag-frog) particual was a mess. I constantly added and refined features, and the code ended up like expected: Messy. But hey, I wrote down a plan, guidelines how a proper code structure should look like for this type of project. Added guidelines from DDD and let it work. It took 2h, and 25 different tasks, and it refactored the whole codebase.

Is it perfect? Hell no. But so wouldn't be my code for a side project I build. I would even say, it is way better than what I would have come up with. Why? Becasue I build it on the side. I can now focus on guidelines and best practices, let it run for hours, and the solution is so close to "very good", that I can manually go through each module and do adjustments if I feel like it. But often times: Really not needed.
