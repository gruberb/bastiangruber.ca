---
title: The economics of gaming - as an adult
description: You see a new game you want to play - the question is, which platform are you going to use?
permalink: posts/{{ title | slug }}/index.html
date: '2025-05-24'
tags: [gaming]
eleventyExcludeFromCollections: true
---

# Gaming as an adult

I define adult in a boring sense in this article - more money than time, although not wealthy. Since I am a kid, I wanted to try out video games I saw in news papers. I never had a gaming PC, nor a console, and I always dreamed of getting one. Maybe during this time I developed more of a lust for figuring out *how* to play game, rather then enjoying *actually playing* it.

Now being a father of two, with a job and a healthy social life, every time I want to play a (new) game, I have the following requirements in my head:

- I need to be able to play in short bursts.
- I cannot count on playing in the living room on the TV every time I want.
- For the amount of time I play, a gaming PC might be too costly to get initially, and the decrease in value is too being.
- Can I run this game on my already existing hardware (MacBook Pro)?

## An example: Animal Well

That's a great example of a game. It can be played in short bursts, it's not violent, and I believe great value for the price it costs. The challenge is: It's not available on macOS. I can get it maybe running on Wine-like software like Codeweavers (and it works).

However, once I am going down this route, I am thinking: Which games on my wishlist can I realistcally play on my current hardware? And what if I buy a gaming-dedicated hardware, how much would it cost, and how many games for how many years can it support?

The obvious options are:

- Windows gaming setup
- Steamdeck or other handheld device
- Nintendo Switch
- Gaming console like XBOX or PlayStation
- Streaming service with a monthly fee

Our example **Animal Well** runs on the first 4, and it's not available on a streaming service. The cheapest hardware I can get in my country of residence (Canada), is a SteamDeck LCD, for around $580.

For this money to be justified, I would have to add a few more games to make it worth it.

# A programatic approach

Since I like spending more time pondering about the idea than probably actually playing, let's create a fictive service, which I can feed a list of games, and it spits out the most cost-effective hardware I have to purchase to play them?

## Mapping out a strategy

For a service like this to work, we need several components

- The list of games we want to play
- Get the hardware support and requirements for each of these games
- Find the common baseline for all of these games
- Figure out how much this baseline would cost

In a perfect world, every shop would have a consumable API. We can query the game on Steam, get the hardare requirements, and then go to each shop (Nintendo, XBOX, PlayStation) to check weather the game is available there as well. And then, get the hardware requirements, find an API with the latest prices on these requirements, and come up with the cheapest way of playing it.

However, each and every step is not officially supported.

## The (unofficial) Steam API

Steam has a few endpoints which are floating around the web.

-
