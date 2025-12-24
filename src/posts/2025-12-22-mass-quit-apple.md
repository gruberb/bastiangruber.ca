---
title: Mass quitting Apple
description: Moving on from iCloud and AppleID
permalink: posts/{{ title | slug }}/index.html
date: '2025-12-22'
tags: [linux]
---

There was a time, probably around 2012 (13 years ago) where I was hoping, wishing Apple would do better: [MobileMe](https://en.wikipedia.org/wiki/MobileMe). I was in university, and was writing for the German Macworld ([Macwelt](https://www.macwelt.de/)) at the time. Dropbox was gaining more popularity, and the phone wars were just heating up. In my mind, it would have been a dream to have a proper, built-in cloud storage so I didn't have to manually sync my iMac and MacBook Air.

Be careful what you wish for. MobileMe ceased to exist. It was a horrible slog to use, and the best part of this service was my shiny @me.com E-Mail address which I still have. iCloud is now fast, and every service in Apple's ecosystem is bundled under one platform. Instead of being an open, configurable environment with APIs, we have another closed ecosystem with the only goal to keep you inside.

In a way that makes it intentionally hard to switch services or add other devices. I started a new job almost 2 years ago, and had to give up my company MacBook, and thought to myself: I need a backup machine. I ordered the Framework laptop and put Arch + [COSMIC](https://system76.com/cosmic) on it. I use Firefox and Thunderbird, but had no way of integrating iCloud Drive in a nice way into my backup setup.

Few months down the line, and COSMIC entered the beta version. It is stable and fast. I fell deeper in love with my Framework laptop, which released a 2.8k 120Hz screen (finally), which I could just order and install myself (in less than 5 minutes).

I also fell in love with tinkering again, and felt constrained by the whole Apple ecosystem. To a point where every device but the Apple TV seems like a drag to use these days. So, time to break up with Apple (again).


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


## My existing setup

- I already owned a very small, dedicated server with OVH. But it was not very powerful (4GB of RAM, low storage, 100Mbit/s up/down, located in France — I live in Canada now, so slow pings). I configured NGINX, had domains pointed to the IP address, had existing SSL certificates with Let's Encrypt and other small services deployed on it.
- I have 3-4 domains registered with GoDaddy.
- I use it as my DNS server via [AdGuard Home](https://adguard.com/en/adguard-home/overview.html).

## My goals

I wanted a more powerful server, more RAM, bandwidth and also a faster ping. I wanted a built-in VPN, so certain services are forced to use a VPN connection or break by default. I wanted to host my own photos, files, calendars and contacts. I want an easy enough backup solution which runs by itself to a second, remote location.

## How I went about it

The thought of setting up a whole self-hosted infrastructure seemed more than daunting. So many services to run and maintain, different installation scripts, docs which are probably outdated or don't exactly fit my particular needs etc.

But hey, we have a shiny new toy at our disposal: LLMs. It seemed to be perfect for this use case.

In my experience and usage, LLMs are vaguely helpful here. They can nail a solution, or lead you off stray if you are not careful in your planning phase. I was overwhelmed with transitioning and keeping existing files, and which services to use for calendars, contacts, photos, file sync, DNS, media handling, and legal torrenting for larger files and backups.

The LLM output was helpful in a way, where I could ask:

> "These x,y,z are my needs. Tell me for File sync every possible self-hosting solution, and create a table with pros and cons. I want to be totally device independent, and it needs good Android, iOS, Linux and macOS apps or integration".

This helped me get to know solutions I maybe wasn't aware of. I did this with every category to get a first overview what's out there.

Turns out, I knew every solution and was also aware of its pros and cons. But good to know anyway.

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


## How it went

The real power doing this with LLMs was the guided step-by-step procedure without having to have hundreds of tabs open. I purchased a new dedicated server with OVH (this time: Intel Xeon, 64GB RAM, 4TB hard drive, located in Canada), and while I waited for the setup to be complete, I logged into my old server and printed every config to the terminal (`cat /path/to/config`) and copy pasted the whole terminal output. I pasted it in Claude and said: "This is my setup, I want to re-create it on my new server."

It then just told me the `sudo apt install` commands and printed out the updated configs for each service, so I could just copy paste and move on. It even suggested to use a `tmux` session for the larger `rsync` operation from server A to B, so closing the `ssh` session wouldn't kill it. Obvious, but I am sure I would have closed it by accident, realized it, googled, had an "Aha, of course tmux" moment and looked for all the right commands on some random blog post.

> I wish LLMs would credit all their sources more. I love these blog posts, and using them subconsciously through a LLM feels just wrong.

I really like that I can tell the LLM to guide me through it step by step, don't be overly expressive and basically just serve as a better helper so I don't have to type everything by hand.

Each service gets its own subdomain and NGINX acts as a reverse proxy. Setting this up was surprisingly straightforward once I understood the pattern.

### The NGINX reverse proxy pattern

Here's what a typical service config looks like (this is for Vaultwarden):

```nginx
server {
    listen 443 ssl http2;
    server_name vault.MY_DOMAIN.ca;

    ssl_certificate /etc/letsencrypt/live/MY_DOMAIN.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/MY_DOMAIN.ca/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

The service (in this case, Vaultwarden) runs on `localhost:8080`. NGINX listens on 443, terminates SSL, and forwards requests. Each service follows this same pattern, just different ports and subdomains.

### DNS setup

For each service, I add an A record in GoDaddy:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | vault | `167.114.xxx.xxx` | 600 |
| A | files | `167.114.xxx.xxx` | 600 |
| A | photos | `167.114.xxx.xxx` | 600 |

All subdomains point to the same server IP. NGINX looks at the `Host` header and routes to the right service. One wildcard Let's Encrypt certificate covers them all.

### Service highlights

**Vaultwarden** was probably the easiest. It's a single Docker container that implements the Bitwarden API. The official Bitwarden apps (iOS, Android, browser extensions) just work — you just point them to your own domain instead of `vault.bitwarden.com`.

**Seafile** handles file sync. It's fast enough that I can edit a file on my desktop and see it update on my phone within seconds. The mobile apps are decent, though not as polished as iCloud Drive. The Linux client (`seaf-cli`) works great as a daemon.

**Immich** is honestly mind-blowing for a self-hosted project. Face recognition, object detection, map view, all running on my own hardware. The mobile app has auto-upload and it just works. The only catch: the ML container uses about 8GB of RAM, but I have 64GB so who cares.

## The VPN routing trick

I wanted Transmission to always go through Mullvad, but not everything else. Turns out you can do this with WireGuard and policy-based routing.

Transmission runs as a specific user (UID 103 on my system). I added a routing rule that sends all traffic from that UID through the WireGuard tunnel:

```bash
ip rule add uidrange 103-103 lookup 200 priority 99
ip route add default dev wg-mullvad table 200
```

Everything else goes direct. I broke my connection quite a few times before I had figured it out.


## Backups

This is the part I'm most paranoid about, and I think rightly so.

3-2-1 rule: three copies, two media types, one offsite.

1. **Live data** on the server
2. **Encrypted daily backup** to a Hetzner Storage Box (offsite, in Germany) using [restic](https://restic.net/)
3. **Weekly sync** to an external drive at home

Daily backups run at 4am via systemd timer. Databases (Immich PostgreSQL, Seafile MariaDB) get dumped to SQL first so the snapshots are consistent.

### How the automation works

The backup is triggered by a systemd timer that runs daily:

```ini
[Unit]
Description=Daily backup to Hetzner Storage Box
Documentation=https://restic.readthedocs.io/

[Timer]
OnCalendar=daily
OnCalendar=*-*-* 04:00:00
Persistent=true
RandomizedDelaySec=15min

[Install]
WantedBy=timers.target
```

The timer calls a service that runs the backup script:

```ini
[Unit]
Description=Backup to Hetzner Storage Box via Restic
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/maple-backup.sh
User=root
Environment="RESTIC_REPOSITORY=sftp:uxxxxxx@uxxxxxx.your-storagebox.de:23/maple-backups"
Environment="RESTIC_PASSWORD_FILE=/root/.restic-password"
```

The actual backup script dumps databases, then uses restic to create encrypted snapshots:

```bash
#!/bin/bash
set -euo pipefail

# Dump databases before backup
docker exec immich_postgres pg_dumpall -U postgres > /backup/immich-db.sql
docker exec seafile-mariadb mysqldump -u root -p"$DB_PASSWORD" --all-databases > /backup/seafile-db.sql

# Run restic backup
restic backup \
    /opt/docker/vaultwarden \
    /opt/docker/seafile \
    /opt/docker/immich \
    /backup \
    --exclude='*.tmp' \
    --exclude-caches

# Cleanup old snapshots (keep last 7 daily, 4 weekly, 6 monthly)
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune

echo "Backup completed at $(date)"
```

The Hetzner Storage Box is accessed via SFTP. Restic handles the encryption, deduplication, and compression. If the server dies, I can restore everything from the Storage Box to a new machine.


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

## What I learned

The technical setup wasn't that hard. NGINX configs are basically copy-paste once you get the pattern. Docker Compose makes services reproducible. Systemd timers are rock solid.

The hard part was the mental shift. With Apple, everything just worked — until it didn't, and then you had no control. Now I have full control — but I'm also responsible when things break.

I check the backup logs every week. I monitor disk space. I keep the system updated. It's maybe 30 minutes of maintenance per month. Totally worth it for the peace of mind.

The biggest win? **I own my identity now.** My email address is on my domain. My files are on my server. My passwords are in my vault. If any single service disappears tomorrow, I can move. That's the freedom I was looking for.
