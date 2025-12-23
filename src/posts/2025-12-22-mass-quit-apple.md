---
title: Mass quitting Apple - Part 1
description: Moving on from iCloud and AppleID
permalink: posts/{{ title | slug }}/index.html
date: '2025-12-22'
tags: [linux]
eleventyExcludeFromCollections: true
---

There was a time, probably around 2012 (13 years ago) where I was hoping, wishing Apple would do better: [MobileMe](https://en.wikipedia.org/wiki/MobileMe). I was in university, and was writing for the German MacWorld ([Macwelt](https://www.macwelt.de/)) at the time. Dropbox was gaining more popularity, and the phone wars were just heating up. In my mind, it would have been a dream to have a proper, built-in cloud storage so I didn't have to manually sync my iMac and MacBook Air.

Be careful what you wish for. MobileMe ceased to exist. It was a horrible slog to use, and the best part of this service was my shiny @me.com E-Mail address which I still have. iCloud is now fast, and every service in Apple's ecosystem is bundled under one platform.

In a way that makes it intentionally hard to switch services or add other devices. I recently started a new job, had to give up my company MacBook, and thought to myself: I need a backup machine. I ordered the Framework laptop and put Arch + [COSMIC](https://system76.com/cosmic) on it. I use Firefox and Thunderbird, but had no way of integrating iCloud Drive in a nice way into my backup setup.

Few months down the line, and COSMIC entered the beta version. It is stable and fast. I fell deeper in love with my Framework laptop, which released a 2.8k 120Hz screen (finally), which I could just order and install myself (in less than 5 minutes).

I also fell in love with tinkering again, and felt constrained by the whole Apple ecosystem. To a point where every device but the Apple TV seems like a drag to use these days. So, time to break up with Apple (again).

---

## The problem with bundling

Here's what I realized: Apple bundles four things that should be separate.

| Layer | What it is | The Apple trap |
|-------|-----------|----------------|
| **Identity** | How the world reaches you | Your @icloud.com address — they own it |
| **Data** | Files, photos, passwords, calendar | All in iCloud, all in one account |
| **Access** | How you connect securely | Their devices, their rules |
| **Recovery** | Getting it back when things break | "Trust us" |

One account suspension, one forgotten password, one "suspicious activity" flag — and all four collapse at once. Your email address, your photos, your passwords, your files. Gone.

I don't think Apple is going to lock me out. But I also don't want my digital life to depend on that assumption.

---

## My existing setup

- I already owned a very small, dedicated server with OVH. But it was not very powerful (4GB of RAM, low storage, 100Mbit/s up/down, located in France — I live in Canada now, so slow pings). I configured NGINX, had domains pointed to the IP address, had existing SSL certificates with Let's Encrypt and other small services deployed on it.
- I have 3-4 domains registered with GoDaddy.
- I use it as my DNS server via [AdGuard Home](https://adguard.com/en/adguard-home/overview.html).

## My goals

I wanted a more powerful server, more RAM, bandwidth and also a faster ping. I wanted a built-in VPN, so certain services are forced to use a VPN connection or break by default. I wanted to host my own photos, files, calendars and contacts. I want an easy enough backup solution which runs by itself to a second, remote location.

---

## How I went about it

The thought of setting up a whole self-hosted infrastructure seemed more than daunting. So many services to run and maintain, different installation scripts, docs which are probably outdated or don't exactly fit my particular needs etc.

But hey, we have a shiny new toy at our disposal: LLMs. It seemed to be perfect for this use case.

In my experience and usage, LLMs are vaguely helpful here. They can nail a solution, or lead you off stray if you are not careful in your planning phase. I was overwhelmed with transitioning and keeping existing files, and which services to use for calendars, contacts, photos, file sync, DNS, media handling, and legal torrenting for larger files and backups.

The LLM output was helpful in a way, where I could ask:

> "These x,y,z are my needs. Tell me for File sync every possible self-hosting solution, and create a table with pros and cons. I want to be totally device independent, and it needs good Android, iOS, Linux and macOS apps or integration".

This helped me get to know solutions I maybe wasn't aware of. I did this with every category to get a first overview what's out there.

Turns out, I knew every solution and was also aware of its pros and cons. But good to know anyway.

---

## What I chose

| Apple Service | Replacement | Notes |
|---------------|-------------|-------|
| iCloud Keychain | Vaultwarden | Bitwarden-compatible, all the apps just work |
| iCloud Drive | Seafile | Fast, handles large files, decent mobile apps |
| Apple Photos | Immich | ML-powered search, face recognition. Impressive. |
| Calendar | Radicale | Simple CalDAV, native iOS/macOS support |
| Contacts | Radicale | CardDAV, same deal |
| Apple Music | Jellyfin | Media server for music and video |
| — | Transmission | Torrents, routed through VPN |
| — | WireGuard + Mullvad | VPN for specific services |
| — | AdGuard Home | DNS server |

For email, I went with [Migadu](https://migadu.com). Small Swiss company, straightforward pricing. I own the domain, they handle the mail. If they disappear, I point my MX records elsewhere and keep my address. That's the key thing — the address is mine now.

---

## How it went

The real power doing this with LLMs was the guided step-by-step procedure without having to have hundreds of tabs open. I purchased a new dedicated server with OVH (this time: Intel Xeon, 64GB RAM, 2x2TB drives, located in Canada), and while I waited for the setup to be complete, I logged into my old server and told Claude which services I ran and where the file locations of each of these were.

I then printed every config to the terminal (`cat /path/to/config`) and copy pasted the whole terminal output. I pasted it in Claude and said: "This is my setup, I want to re-create it on my new server."

It then just told me the `sudo apt install` commands and printed out the updated configs for each service, so I could just copy paste and move on. It even suggested to use a `tmux` session for the larger `rsync` operation from server A to B, so closing the `ssh` session wouldn't kill it. Obvious, but I am sure I would have closed it by accident, realized it, googled, had an "Aha, of course tmux" moment and looked for all the right commands on some random blog post.

> I wish LLMs would credit all their sources more. I love these blog posts, and using them subconsciously through a LLM feels just wrong.

---

## The VPN routing trick

I wanted Transmission to always go through Mullvad, but not everything else. Turns out you can do this with WireGuard and policy-based routing.

Transmission runs as a specific user (UID 103 on my system). I added a routing rule that sends all traffic from that UID through the WireGuard tunnel:

```bash
ip rule add uidrange 103-103 lookup 200 priority 99
ip route add default dev wg-mullvad table 200
```

Everything else goes direct. Took me a while to get this working — the debugging was annoying but satisfying once it clicked.

---

## Backups

This is the part I'm most paranoid about, and I think rightly so.

3-2-1 rule: three copies, two media types, one offsite.

1. **Live data** on the server
2. **Encrypted daily backup** to a Hetzner Storage Box (offsite, in Germany) using [restic](https://restic.net/)
3. **Weekly sync** to an external drive at home

Daily backups run at 4am via systemd timer. Databases (Immich PostgreSQL, Seafile MariaDB) get dumped to SQL first so the snapshots are consistent.

---

## What it costs

| Item | Monthly (CAD) |
|------|---------------|
| OVH dedicated server | $38 |
| Mullvad VPN | $8 |
| Migadu email | $2 |
| Domain | $2 |
| Hetzner Storage Box | $6 |
| **Total** | **~$56** |

Compare that to iCloud+ 2TB ($13) + 1Password ($5) + Spotify ($11) + VPN ($8) = ~$37/month.

So yes, I'm paying about $19/month more. But I have a dedicated server with 64GB of RAM and 4TB of storage. I can run side projects on it. Experiments. Whatever I want.
