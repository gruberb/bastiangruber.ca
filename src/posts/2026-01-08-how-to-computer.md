---
title: How to Internet for normal people
description: How to think about and browse the Internet
permalink: posts/{{ title | slug }}/index.html
date: '2026-01-08'
tags: [internet]
eleventyExcludeFromCollections: true
---

Two years ago, I moved from Berlin, Germany, to a small town of about 12,000 people in Nova Scotia, Canada. From a European tech hub to a place where the nearest big-box store is an hour's drive and everyone knows your car.

The shift wasn't just visible in the landscape—the ocean, the forests, the quiet. It showed up in the digital world too. Facebook, a platform I hadn't touched in over a decade, turned out to be the center of everything here. Community announcements, buy-and-sell groups, event planning, local news. If it's happening, it's happening on Facebook.

But something else became clear, especially as a parent: people here—like people everywhere—are struggling with the internet. Not because they're stupid. Because nobody taught them.

I see two responses, over and over:

**Hands up:** "I don't understand it, my kids know more than me, I just let them do whatever."

**Walls up:** "It's all dangerous, we keep screens out of the house entirely."

Both responses are understandable. Neither one prepares a human being to navigate the world they actually live in.

Here's the thing: limiting screen *time* isn't the same as teaching screen *literacy*. A kid who gets one hour of unsupervised YouTube is not better off than a kid who gets three hours of intentional, guided use. The clock isn't the point. Understanding is.

This guide is my attempt to share what I know. It started as notes for a workshop I want to run in my community. Now it's this: a handout, a reference, a starting point.

You don't need to become a computer expert. You just need a map.

---

## How the Internet Works (In About 500 Words)

The internet is computers talking to computers. That's it. Everything else is layers on top.

When you type a website address into your browser—say, `wikipedia.org`—your computer sends a request out into the world. That request travels through cables. Actual, physical cables. Some of them run under the ocean: over 1.3 million kilometers of undersea cable, thinner than a garden hose, resting on the seafloor, connecting continents. Sharks sometimes bite them. This is not a metaphor.

Your request arrives at a *server*—which is just another computer, usually sitting in a large, windowless building filled with thousands of identical machines. These buildings are called data centers. When people say "the cloud," this is what they mean: someone else's computer, in a building you'll never see, probably somewhere with cheap electricity.

How does your computer know where to send the request? That's where the *Domain Name System* (DNS) comes in. It's like a phone book. You type `wikipedia.org`, and DNS looks up the actual numerical address (something like `208.80.154.224`). This happens billions of times a second, all over the world, and you never notice.

The server receives your request and sends back code—HTML, CSS, JavaScript—and your *browser* (Firefox, Chrome, Safari) takes that code and turns it into the page you see. The same website looks the same whether you're in Halifax or Hamburg because everyone agreed on standards. Protocols. Shared ways of doing things.

Here's what's remarkable: nobody owns the internet. There's no CEO, no headquarters, no single off-switch. It's a set of agreements—protocols that everyone decided to follow. That's why it's resilient, why it survived becoming a global infrastructure, and why it's worth understanding.

The internet was designed to be open. What happened next is a different story.

---

## What Does "Accessing the Internet" Actually Mean?

Not all internet use is the same. There are two fundamentally different experiences, and most people don't realize they're having them.

**The Library Model**

You visit a website. You get information. You leave. The website might not know who you are—it doesn't need to. You came, you read, you went.

This is how the web was designed to work. Wikipedia operates this way. So does a recipe blog, a news site, a government page. You're a visitor, not a user. The relationship is simple.

**The Hotel Model**

You check in with your name. They track which rooms you enter, what you eat, who you talk to, how long you stay. Your stuff is in the room—your photos, your messages, your friends. Leaving is complicated because everything you have is inside.

This is Facebook. Instagram. TikTok. WhatsApp. You're not visiting. You're living in someone else's building, using their furniture, following their rules. They decide what you see. They keep records of everything you do.

When you "use Facebook," you're not really "on the internet" the way you're on the internet when you visit a website. You're inside a walled garden, managed by a company whose business model depends on keeping you there.

**Why does this matter?**

The platforms are convenient. I'm not saying never use them. But understand what you're trading.

When you use WhatsApp, your messages travel through Meta's servers. They've promised not to read the content (end-to-end encryption). But they know *who* you talk to, *when*, and *how often*. They know your phone number, your contacts, your patterns. That information is valuable. That's not paranoia. That's their quarterly earnings report.

The web was built for the library. The platforms built hotels and invited everyone inside. You can still use the library. It's still there.

---

## How to Configure Your Browser for Safety and Intention

Your browser came with factory settings. Those defaults were chosen by someone—and that someone had priorities that might not match yours.

Let's change a few things.

**Step 1: Use Firefox**

I'm not saying Chrome is evil. But incentives matter. Google makes its money from advertising. Their browser will never make it easy to block ads or avoid tracking—that would hurt their business.

<a href="https://www.mozilla.org/en-US/">Mozilla</a>, the organization behind Firefox, is a non-profit. Their mission is to keep the internet open and accessible. <a href="https://www.firefox.com/en-US/">Firefox</a> is designed to protect you, not to harvest you.

The switch takes about 5 minutes. Firefox will import your bookmarks, passwords, and history from Chrome automatically.

**Step 2: Install uBlock Origin**

This is the single biggest improvement you can make to your experience of the web.

<a href="https://ublockorigin.com/">uBlock Origin</a> is a browser extension that blocks:
- Advertisements
- Tracking scripts (code that follows you from site to site)
- Malware domains
- Annoyances (newsletter popups, cookie banners, "subscribe now!" overlays)

After installing it, the web feels different. Calmer. Faster. Pages load more quickly because they're not fetching dozens of tracking scripts. Articles are just articles, not obstacle courses.

Find it in <a href="https://addons.mozilla.org/en-CA/firefox/addon/ublock-origin/">Firefox Add-ons</a>. It's free and it takes one click to install.

**Step 3: A Few More Tools (Optional)**

- **Facebook Container**: A Firefox extension that isolates Facebook in a separate sandbox. Facebook can't see what you're doing in other tabs. It's quarantined.
- **SponsorBlock**: Automatically skips sponsored segments in YouTube videos. Community-maintained—regular users mark where sponsors start and end, and the extension uses that data.
- **Bypass Paywalls Clean**: Access news articles behind paywalls. This is ethically gray. Journalism matters and journalists need to eat. But information also wants to be free, and not everyone can afford subscriptions. If you just want to read one article on, let's say the Financial Times, this plugin lets you read it for free. But be mindful: Democracy needs good journalism. Pay for the one you think are ethical and help society, and use this plugin to consume articles you need to read but can't afford.

**Step 4: Adjust Your Settings**

- Set your default search engine to DuckDuckGo. It works well and doesn't track you. Google is fine, but it doesn't need more data about your life.
- Enable "Do Not Track." It's a polite request to websites. Some respect it.
- Consider clearing cookies when you close the browser. Or use Firefox's Multi-Account Containers to keep different parts of your life separate.

**The Philosophy**

You're not hiding. You're not paranoid. You're just declining to volunteer information that nobody asked for and that doesn't benefit you to share.

---

## What Dangers Should I Look Out For?

The internet isn't dangerous the way a dark alley is dangerous. It's dangerous the way a casino is dangerous: it's designed, very carefully, to keep you there longer than you intended.

**Attention Harvesting**

Some websites want to *inform* you. Others want to *capture* you. Learn to tell the difference.

Signs a website is trying to capture you:
- **Infinite scroll**: There's no bottom. No natural stopping point. You have to *decide* to leave, which takes effort, which you might not have after forty minutes of scrolling.
- **Autoplay**: Videos start without asking. You didn't choose to watch—they chose for you.
- **Notification requests**: "Allow notifications?" means "Let us interrupt your life whenever we want to pull you back."
- **Fake urgency**: Countdown timers. "Only 3 left in stock!" (The timer resets. There are more than 3.)
- **Algorithmic feeds**: You didn't ask for this content. A system decided you'd engage with it. "Engage" means react, not enjoy.

Signs a website respects you:
- Pages have ends.
- You can find what you need and leave.
- No manipulation in the cookie consent. A clear "Reject All" button, not a maze of toggles.

**A Useful Test**

After twenty minutes on a website, do you feel *informed* or *drained*?

If you learned something, great. If you feel vaguely bad and can't remember what you looked at, you were harvested.

---

## My Child Wants to Play Games. How Do I Handle This?

First: games are not the enemy. Games can be creative, social, challenging, beautiful. Some of the best storytelling in modern culture happens in games. This isn't about saying no.

It's about knowing what you're saying yes to.

**How "Free" Games Make Money**

Most free games aren't free. They're funded by:

- **Ads**: Often frequent, sometimes inappropriate, occasionally indistinguishable from the game itself (especially for young children who don't recognize what an ad is).
- **In-app purchases**: The game is designed to create frustration, then sell you the solution. Can't pass this level? Buy more lives. Want that item? Pay up.
- **Data collection**: Your child's habits, preferences, and patterns, sold to advertisers.

None of this is disclosed in a way kids understand. It's not always clear to adults.

**Where to Find Good Games**

- **Common Sense Media** (commonsensemedia.org): Detailed reviews by parents, age ratings, breakdowns of exactly what's in a game. Check here first.
- **itch.io**: Independent developers. Weird, creative, personal games. Often free or pay-what-you-want. Lower production budgets, higher heart.
- **GOG.com**: Classic and modern games, DRM-free (you actually own what you buy), curated for quality.
- **Humble Bundle**: Pay what you want for game bundles. A portion goes to charity.

**Questions to Ask Before Installing**

1. Who made this, and how do they make money?
2. Does it need to be online? (Offline games can't show ads or track behavior.)
3. Are there in-app purchases? What kind?
4. Is there a chat feature or social element? How is it moderated?

**The Conversation**

Don't just ban things. Explain the deal.

"This game is free because they want to show you ads. That's the trade. Do you want to make that trade?"

"This game lets you buy things with real money. That's how they make it. Let's play something else."

Kids understand trades. They understand that things cost something, even when money isn't visible. Teach them to see the cost.

---

## How to Spot Scams

Scams work because they bypass your thinking brain and hit the emotional one. Urgency, fear, excitement—these shortcut your judgment.

The core skill is simple: *slow down*.

**Email Scams**

- **Look at the actual sender address.** Click or hover on the sender's name. "Netflix Support" might actually be `netflix-billing-support@randomdomain.ru`. The display name is a costume.
- **Hover over links before clicking.** Your browser will show you where a link actually leads. If it says "Click here to verify your account" but the link goes to `totally-not-a-scam.biz`, don't click.
- **"Verify your account immediately!"** Real companies don't send threats. If you're worried, go to the website directly—type the address yourself, don't click the link—and check your account from there.

**Universal Red Flags**

- URGENT! ACT NOW! TIME SENSITIVE! (Real deadlines aren't written in all caps.)
- Unexpected money: lottery winnings you didn't enter, inheritance from strangers, government refunds you didn't apply for.
- Requests for gift cards. No legitimate organization accepts payment in iTunes cards.
- Emotional manipulation: "I'm stranded abroad, please send money." "Your grandchild is in trouble."
- Spelling and grammar errors in supposedly official communications.

**Phone Scams**

- "Microsoft Support" will never call you. Ever. Microsoft doesn't know your phone number and doesn't care about your computer.
- The CRA or IRS doesn't call demanding immediate payment. They send letters.
- If someone claims to be from your bank, hang up and call the number on your card.

**The Golden Rule**

Legitimate organizations give you time to think. Scammers need you to act before you think. If you feel rushed, that's the red flag.

---

## How to Find Information for Free

The internet is full of free knowledge. You just have to know where to look.

**Your Library Card Is a Superpower**

Seriously. That card unlocks:

- **Libby / OverDrive**: Free ebooks and audiobooks on your phone. New releases, popular titles, vast backlists.
- **PressReader**: Thousands of newspapers and magazines from around the world.
- **Kanopy**: Free streaming—documentaries, classic films, independent cinema.
- **LinkedIn Learning** (at some libraries): Free courses on professional skills.
- **Research databases**: Academic papers, historical archives, specialized resources.

All of this is publicly funded. It exists for you. Use it.

**The Open Web**

- **Internet Archive** (archive.org): The library of the entire web. Books, music, old websites preserved forever, movies, software. The Wayback Machine lets you see what any website looked like years ago.
- **Wikipedia**: Over 60 million articles, written by volunteers, no ads, no paywall. Imperfect, but extraordinary.
- **Project Gutenberg**: 70,000+ free ebooks—classics whose copyright has expired.
- **OpenLibrary**: Borrow digital books like a library.

**The Paywall Question**

Many local newspapers offer free digital access through libraries. Check before you bypass anything.

For other paywalls, tools exist. Search for "Bypass Paywalls Clean" on GitHub and install it as a Firefox extension. You're an adult; use your judgment. Journalists need to be paid, and also, important information shouldn't only be available to those who can afford subscriptions.

Anna's Archive is a search engine for books and academic papers. I'm not telling you to use it. I'm telling you it exists.

---

## What Is AI, and What Should I Use It For?

"AI" means a lot of things, but what everyone's talking about right now—ChatGPT and its relatives—are *large language models*. Here's what that means:

They've read most of the internet. They've learned to predict, with impressive accuracy, what word should come next in a sentence. That's it. That's the trick.

It's not thinking. It's not conscious. It's a very sophisticated autocomplete. And it's *extremely good* at sounding confident.

**What It's Good For**

- **Brainstorming**: "Give me ten ideas for..." works well. You won't use most of them, but one might spark something.
- **Explaining things simply**: "Explain DNS like I'm ten years old" often produces clear, useful explanations.
- **Drafting**: First versions of emails, letters, outlines. Getting past the blank page.
- **Summarizing**: Paste in a long document, ask for a summary.
- **Talking through problems**: Sometimes you just need to explain your situation to something that asks follow-up questions.

**What It's Bad For**

- **Facts**. It will make things up. Confidently. It will cite sources that don't exist. It will invent statistics. This is called "hallucination," and it's not a bug—it's inherent to how these systems work.
- **Medical, legal, or financial advice**. Don't.
- **Anything requiring accuracy without verification**. If you can't check it, don't trust it.
- **Replacing human judgment**. It doesn't have any.

**The Essential Skill**

Verification. Treat AI output as a first draft from an enthusiastic intern who sometimes makes things up. Use it as a starting point, not an answer.

**Privacy Note**

Assume anything you type into ChatGPT or similar tools could be used to train future models. Don't paste in sensitive personal information, confidential work documents, or anything you wouldn't want associated with your account.

---

## Can I Trust My Home Devices?

You know the ones. Alexa. Siri. Google Home. The helpful voice in the speaker on your counter.

Here's the situation: these devices work by listening. That's the feature. They're waiting for their wake word, and when they hear it, they start processing. To wait for the wake word, they have to listen constantly.

The companies say they're not *recording* constantly, just listening for the trigger. And mostly, that's true. But:

- Recordings are sometimes reviewed by humans (for "quality improvement").
- Accidental activations happen. The device thinks it heard its wake word when it didn't.
- The data about what you ask—your questions, your commands, your habits—is stored and analyzed.

**Is This Bad?**

That depends on your comfort level. These devices are convenient. Asking a speaker for a timer while your hands are covered in flour is genuinely useful.

But understand the trade: you've put a microphone connected to a corporation in your home. You're trusting that corporation to handle what it hears responsibly. Maybe you do trust them. Maybe you don't. Either way, know what you're choosing.

**Practical Suggestions**

- Use the mute button when you want privacy. Most devices have one.
- Review and delete your voice history periodically. (Alexa, Google, and Siri all have settings for this.)
- Ask yourself: what's the convenience, and what's the cost? Is the timer worth it?

---

## Where to Get Inspired and Find Communities

The internet before platforms was weird, personal, and human. People made websites because they had something to say, not because they wanted followers. You'd stumble from one strange corner to another, following links, finding things nobody curated for you.

That world still exists. It's smaller now, quieter, but it's there.

**Are.na** (are.na)

A visual space for collecting and connecting ideas. You save things—images, links, text, whatever—into "channels." Other people do the same. Sometimes your channels intersect with strangers' channels, and you discover someone who thinks like you.

No likes. No followers. No algorithm. Just people saving what interests them and occasionally finding each other.

**Mastodon** (joinmastodon.org)

Social media without a company. No ads, no algorithm deciding what you see, no single owner who can sell it or ruin it.

It's "federated"—lots of small communities running their own servers, all connected to each other. You pick a server (called an "instance") that matches your interests—there are instances for academics, artists, technologists, specific countries, whatever—and you can talk to people on any other server.

It's slower than Twitter. Weirder. More human. That's the point.

**Newsletters**

Some of the best writing on the internet now comes through email. You subscribe directly to people you want to hear from. No algorithm between you and them. It arrives when they write, not when a machine decides you should see it.

**Personal Websites**

They still exist. Blogrolls are returning—people linking to other people they like, like the old days. The "small web" or "indie web" is a whole movement of people building their own corners, outside the platforms.

**The Feeling Is Different**

These spaces are slower, quieter, less addictive. You won't get the dopamine rush of a viral post. You won't feel the pull to check every few minutes.

That's the feature.

---

## The Road Ahead

The internet is infrastructure. Like roads. Like electricity. Like running water.

You don't need to be an electrical engineer to use a light switch safely. You just need to know a few things: don't stick forks in outlets, replace batteries in your smoke detector, call a professional for the complicated stuff.

The internet is the same. You don't need to understand packet switching or TLS handshakes. You just need to know where the dangers are, what the warning signs look like, and that you have more choices than you've been led to believe.

The web was built to be open. Platforms tried to enclose it. But the open web is still there—the libraries, the archives, the weird personal sites, the communities that don't need your data.

This guide is your map. The territory is vast, strange, and more interesting than any algorithm will ever show you.

Go explore.

---

*This post began as notes for an in-person workshop in my small town in Nova Scotia. If you're running something similar in your community, you're welcome to use or adapt this material. The internet is better when more people understand it.*
