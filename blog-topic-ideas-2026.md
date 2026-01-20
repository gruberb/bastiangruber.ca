# Blog Topic Ideas for 2026

A curated list of technical blog topics designed to showcase expertise and align with target companies (1Password, Canonical, Cloudflare, Datadog, Dropbox, GitLab, Grafana, JetBrains, Supabase, Tailscale, etc.).

---

## Deep Systems Programming

### 1. Journey of an HTTP Request: From Firefox Search Bar to the NIC

**Series (3-4 parts)**

Turn existing notes (`~/System & Tech/Linux/tracing-http-request-guide.md`) into a comprehensive series:

- **Part 1: Firefox Necko Stack** - URL bar input → UrlbarController → nsHttpChannel → DNS resolution (native vs TRR) → nsSocketTransport → TLS handshake via PSM/NSS
- **Part 2: Linux Kernel Networking** - Socket syscalls, TCP state machine, /proc/net interfaces, kernel tracing with ftrace/eBPF
- **Part 3: Wire-Level Analysis** - Wireshark with TLS key logging, HTTP/2 frame inspection, DNS query analysis
- **Part 4 (Optional): HTTP/3 and QUIC** - neqo implementation in Firefox, UDP sockets, connection migration

**Tools to demonstrate:** `MOZ_LOG`, `strace`, `bpftrace`, `tcpdump`, Wireshark, Firefox DevTools

**Appeals to:** Cloudflare, Fastly, Tailscale, 1Password, Canonical

**Status:** Notes 90% complete, needs editing and screenshots

---

### 2. Building a Linux Network Monitor in Rust: From /proc to Netlink to eBPF

**Series (3 parts)**

Based on existing notes (`~/System & Tech/Linux/LINUX_NETWORKING_GUIDE.md`):

- **Part 1: The /proc Approach** - Parsing `/proc/net/tcp`, address encoding (little-endian hex), TCP states, inode-to-process mapping via `/proc/<pid>/fd/`
- **Part 2: Netlink SOCK_DIAG** - Binary protocol, filtering in kernel, richer metadata (congestion window, RTT, memory usage)
- **Part 3: eBPF for Real-Time Monitoring** - Hooking `tcp_connect()`, `tcp_accept()`, event streaming to userspace with `aya` crate

**Code output:** Working CLI tool similar to `ss` or `netstat`

**Appeals to:** Datadog, Grafana, Sentry, Honeycomb (observability companies)

**Status:** Notes complete, needs code cleanup and prose

---

### 3. What Happens When You `curl` a URL: A 5-Layer Deep Dive

**Single post (long-form)**

Standalone, accessible version of the HTTP journey:

1. **DNS Resolution** - `/etc/resolv.conf`, stub resolver, recursive queries, caching
2. **TCP Handshake** - SYN/SYN-ACK/ACK, socket states, `connect()` syscall
3. **TLS Negotiation** - ClientHello, certificate verification, key exchange (ECDHE), session resumption
4. **HTTP/2 Request** - HPACK header compression, streams, flow control
5. **Response Processing** - Decompression, chunked encoding, connection reuse

**Include:** `strace` output, `tcpdump` captures, annotated Wireshark screenshots

**Appeals to:** Canonical, Dropbox, any backend engineering role

---

## Rust Systems Programming

### 4. Async Rust Under the Hood: How Tokio Schedules Your Futures

**Single post or 2-part series**

Go deeper than typical async tutorials:

- **Part 1: The Runtime** - Thread pool, task queues, work stealing, `block_on` vs `spawn`
- **Part 2: Wakers and Polling** - How `Future::poll` works, `Waker` implementation, reactor pattern for I/O

**Code examples:** Custom simple executor, tracing task scheduling with `tokio-console`

**Appeals to:** Cloudflare, Tailscale, Discord, 1Password (any Rust shop)

**Builds on:** Existing "Asynchronous Rust" webinar content

---

### 5. UniFFI in Practice: Exposing Rust to Swift, Kotlin, and Python

**Single post**

Share real patterns from Firefox application-services:

- UDL (UniFFI Definition Language) basics
- Handling async functions across FFI boundaries
- Error handling and type mapping
- Memory management (preventing leaks, preventing use-after-free)
- CI/CD for multi-platform builds
- Real pitfalls encountered at Mozilla

**Appeals to:** Mobile companies, cross-platform teams, JetBrains (Fleet uses Rust)

**Unique angle:** Actual production experience, not just "hello world"

---

### 6. Building a High-Throughput P2P Message Bus in Rust

**Series (2-3 parts)**

Draw from Toposware experience (10x throughput improvement):

- **Part 1: Architecture** - libp2p basics, gossipsub, peer discovery, NAT traversal
- **Part 2: Performance** - Congestion control, backpressure, batching strategies, zero-copy where possible
- **Part 3: Benchmarking & Profiling** - Setting up reproducible benchmarks, flamegraphs, identifying bottlenecks

**Appeals to:** Distributed systems companies, infrastructure teams

**Differentiator:** Real production war stories, not theoretical

---

### 7. Memory-Efficient Data Structures in Rust: Beyond Vec and HashMap

**Single post**

Practical techniques for memory-constrained systems:

- Compact string representations (`CompactString`, `SmolStr`, string interning)
- Arena allocation with `bumpalo` and `typed-arena`
- Bitflags and packed structs
- Custom allocators for specific workloads
- Measuring memory with `dhat` and `heaptrack`

**Appeals to:** ClickHouse, database companies, performance-focused teams

---

## Firefox / Browser Internals

### 8. How Firefox Suggest Works: From Keystroke to Suggestion

**Single post**

Explain the system you help maintain:

- Client-side: UrlbarProviders, ranking, frecency
- Merino service: Architecture, data sources, caching
- Privacy model: What data is sent, what isn't, OHTTP integration
- Deployment: Python/FastAPI service, scaling considerations

**Appeals to:** DuckDuckGo, privacy-focused companies, search teams

**Unique angle:** Insider perspective with actual architecture diagrams

---

### 9. OHTTP (Oblivious HTTP): Privacy-Preserving APIs in Practice

**Single post**

Based on your OHTTP implementation in application-services:

- The problem: Metadata leakage in HTTPS requests
- OHTTP architecture: Client → Relay → Gateway, double encryption
- Implementation details: Key encapsulation, request/response encoding
- Real-world deployment: How Firefox uses OHTTP for Suggest, sync features
- Tradeoffs: Latency, complexity, trust model

**Appeals to:** 1Password, Bitwarden, Tailscale, Signal, privacy-tech companies

**High value:** Few people have implemented this in production

---

### 10. Inside the Firefox Push Service: Handling Millions of Concurrent WebSocket Connections

**Single post**

Architecture deep-dive:

- Connection management at scale (millions of persistent connections)
- WebSocket handling in async Rust
- Message routing and delivery guarantees
- Graceful degradation and backpressure
- Monitoring and alerting
- Deployment topology

**Appeals to:** Discord, real-time infrastructure, chat/notification systems

---

## Self-Hosting / Infrastructure

### 11. Self-Hosting for Engineers: My Complete Stack (2026 Edition)

**Single post (reference guide)**

Expand the "Mass quitting Apple" post into a comprehensive reference:

- **Services:** Vaultwarden, Seafile, Immich, Radicale, Jellyfin, AdGuard Home
- **Infrastructure:** NGINX reverse proxy patterns, Let's Encrypt automation, Docker Compose
- **Networking:** WireGuard VPN, policy-based routing (UID-based), DNS configuration
- **Backups:** 3-2-1 rule, restic to Hetzner Storage Box, systemd timers, database dumps
- **Monitoring:** What to watch, alerting basics
- **Cost breakdown:** Detailed comparison with cloud services

**Appeals to:** Shows operational maturity, relevant to SRE/platform roles

---

### 12. Building a Reverse Proxy in Rust: From Scratch to Production

**Series (2-3 parts)**

- **Part 1: HTTP Parsing** - Request/response parsing, `httparse` crate, handling edge cases
- **Part 2: Proxying & TLS** - Forwarding requests, TLS termination with `rustls`, connection pooling
- **Part 3: Production Features** - Load balancing, health checks, graceful shutdown, metrics

**Compare with:** NGINX internals, explain what production proxies actually do

**Appeals to:** Cloudflare, Fastly, infrastructure teams

---

### 13. Systemd Timers vs Cron: A Deep Comparison with Production Examples

**Single post**

Practical ops content:

- Timer types: Monotonic vs realtime, `OnCalendar` syntax
- Dependencies: `After=`, `Wants=`, socket activation
- Failure handling: `OnFailure=`, restart policies
- Logging and monitoring: `journalctl`, integration with alerting
- Migration guide: Converting cron jobs to systemd timers
- Real examples: Backup scripts, certificate renewal, cleanup jobs

**Appeals to:** Canonical (systemd expertise), platform engineering roles

---

## Databases & Storage

### 14. How LSM Trees Work: Building a Key-Value Store in Rust

**Series (3 parts)**

Fundamental knowledge for database companies:

- **Part 1: Memtables and WAL** - In-memory sorted structure, write-ahead logging for durability
- **Part 2: SSTables and Compaction** - On-disk format, bloom filters, leveled vs tiered compaction
- **Part 3: Read Path and Optimizations** - Binary search, block cache, compression

**Code output:** Simple but functional key-value store

**Appeals to:** ClickHouse, CockroachLabs, PingCAP, TigerData, Materialize

---

### 15. Understanding Write-Ahead Logging (WAL): Implementation and Tradeoffs

**Single post**

Deep dive into durability:

- Why WAL exists: Crash recovery, atomic commits
- Implementation: Log structure, sequence numbers, checkpointing
- `fsync` and durability: When to sync, group commit optimization
- Recovery process: Replaying the log, handling partial writes
- Tradeoffs: Performance vs durability guarantees

**Code examples:** Simple WAL implementation in Rust

**Appeals to:** Any database company, Supabase

---

### 16. Postgres Wire Protocol: Building a Compatible Server in Rust

**Single post or 2-part series**

Shows protocol-level understanding:

- Protocol overview: Startup, authentication, query cycle
- Message format: Type codes, length prefixes, data encoding
- Implementing basics: Handshake, simple query, row description, data rows
- Error handling: Error and notice messages
- Testing: Using `psql` against your implementation

**Appeals to:** Supabase, CockroachLabs, database tooling companies

---

## Observability & Debugging

### 17. Tracing Distributed Systems: From printf to OpenTelemetry

**Single post**

Practical observability guide:

- Evolution: printf → structured logging → distributed tracing
- Concepts: Spans, traces, context propagation, baggage
- Rust implementation: `tracing` crate, `tracing-opentelemetry`, subscribers
- Visualization: Jaeger, Grafana Tempo
- Best practices: What to trace, cardinality concerns, sampling

**Appeals to:** Datadog, Grafana, Honeycomb, Sentry

---

### 18. Profiling Rust Applications: From Flamegraphs to Memory Allocators

**Single post**

Real optimization techniques:

- CPU profiling: `perf`, `flamegraph`, `samply`
- Memory profiling: `heaptrack`, `dhat`, tracking allocations
- Async profiling: `tokio-console`, understanding task behavior
- Micro-benchmarking: `criterion`, avoiding pitfalls
- Case study: Real optimization story with before/after

**Appeals to:** Performance-focused teams, JetBrains (profiler tools)

---

## Security & Cryptography

### 19. TLS 1.3 From Scratch: Understanding the Handshake

**Single post**

Based on PSM/NSS experience:

- Why TLS 1.3: Improvements over 1.2, removed features
- Handshake walkthrough: ClientHello, ServerHello, key schedule
- Key exchange: ECDHE, X25519
- 0-RTT: Early data, replay protection concerns
- Practical: Reading Wireshark TLS dissection, debugging with `SSLKEYLOGFILE`

**Appeals to:** 1Password, Bitwarden, Tailscale, Cloudflare

---

### 20. Building a Password Manager Backend: Security Architecture Decisions

**Single post**

High-level architecture discussion:

- Threat model: What are we protecting against?
- Key derivation: Argon2, PBKDF2, parameters tuning
- Encryption at rest: AES-GCM, key wrapping
- Zero-knowledge architecture: What the server never sees
- Sync protocol: Conflict resolution, versioning
- Authentication: SRP, WebAuthn considerations

**Appeals to:** 1Password, Bitwarden directly

---

## Developer Experience

### 21. Designing Good CLIs in Rust: Lessons from Real Tools

**Single post**

Based on Toposware CLI rewrite:

- Argument parsing: `clap` derive vs builder, subcommands
- Configuration: Config files, environment variables, precedence
- Error messages: Actionable errors, `miette` for rich diagnostics
- Output: Human vs machine output, `--json` flags, progress indicators
- Shell completions: Generating for bash/zsh/fish
- Testing: Integration testing CLI applications

**Appeals to:** GitLab, JetBrains, developer tools companies

---

### 22. Contributing to Firefox: A Practical Guide for Rust Developers

**Single post**

Lower the barrier for open source:

- Getting started: `mach bootstrap`, build system basics
- Finding work: Good first bugs, component areas
- Rust in Firefox: Where Rust lives, FFI patterns, `xpcom`
- Code review: Phabricator workflow, reviewer expectations
- Testing: Try server, test types, local testing
- Landing: Autoland, sheriffs, backing out

**Appeals to:** Shows community leadership, open-source-friendly companies

---

## Prioritization

### High Priority (Start Here)

| # | Topic | Reason |
|---|-------|--------|
| 1 | HTTP Request Journey | Notes 90% ready, unique Mozilla angle, broad appeal |
| 9 | OHTTP Deep Dive | Rare expertise, directly relevant to security companies |
| 6 | P2P Message Bus | Differentiating experience, distributed systems depth |
| 14 | LSM Trees | Opens doors to database companies |

### Medium Priority

| # | Topic | Reason |
|---|-------|--------|
| 2 | Linux Network Monitor | Notes ready, observability appeal |
| 5 | UniFFI in Practice | Unique Mozilla expertise |
| 10 | Firefox Push Service | Scale story, Discord/real-time appeal |
| 17 | Distributed Tracing | Observability companies |

### Lower Priority (But Valuable)

| # | Topic | Reason |
|---|-------|--------|
| 4 | Async Rust Internals | Builds on existing talks |
| 11 | Self-Hosting Guide | Personal brand, shows ops skills |
| 19 | TLS 1.3 | Security companies |
| 22 | Firefox Contributing | Community building |

---

## Content Calendar Suggestion

| Month | Topic | Type |
|-------|-------|------|
| Feb | HTTP Request Journey (Part 1) | Series kickoff |
| Mar | HTTP Request Journey (Part 2-3) | Series completion |
| Apr | OHTTP Deep Dive | Single post |
| May | P2P Message Bus (Part 1) | Series kickoff |
| Jun | P2P Message Bus (Part 2) | Series completion |
| Jul | LSM Trees (Part 1) | Series kickoff |
| Aug | LSM Trees (Part 2-3) | Series completion |
| Sep | Linux Network Monitor (Part 1) | Series kickoff |
| Oct | Linux Network Monitor (Part 2-3) | Series completion |
| Nov | UniFFI in Practice | Single post |
| Dec | Year-end review / Self-hosting update | Single post |

---

## Notes

- Each series part should be self-contained enough to read standalone
- Include working code examples (GitHub gists or repo)
- Add diagrams (Excalidraw) for architecture posts
- Cross-post to Lobsters, HackerNews, relevant subreddits
- Consider recording video walkthroughs for complex debugging sessions
