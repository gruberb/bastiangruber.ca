---
title: Non-Negotiables
description: These are the principles I want to follow every day in my professional career
permalink: posts/{{ title | slug }}/index.html
date: '2024-06-16'
tags: [career]
---

I thought about "What makes a "good" engineer" for a long time, and probably will until my death bed. In the day to day, it's sometimes hard to figure out: Did I do a good job? For the technical aspect of my day to day work, I printed own my own "Non Negotiables" (inspired by [The Bear](https://www.youtube.com/watch?v=VMp0Ai-YnMk)), and put it next to my desk on the wall. I aim to follow them.

Here they are:

### Understand the problem/feature to evaluate the possible solutions
Can it be efficetively solved with existing things or require new code?

### Aim for simplicity
Think about what is necessary and sufficient to solve the problem, make interfaces and interactions as simple as they can be, don’t write “clever” or confusing code unless absolutely necessary.

### Aim for elegance
Code should be readable and look beautiful, APIs should be small and well defined.

### Aim for efficiency where possible
Avoid too many layers of abstraction or algorithms or structures that don’t scale.

### Think about clear separation of policy and mechanism
Aim for simple clean mechanisms that you can layer different policies on as needed.

### Think about extensibility
What things would your solution preclude being done in the future, try to spot leaky abstractions.

### Think about failure scenarios and how to test for them and recover or fail as gracefully as possible.

### Use useful comments to help future maintainers
Including yourself!
