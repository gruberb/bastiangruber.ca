---
title: Embermarks - A Firefox Extension 
description: Rediscover your forgotten bookmarks
permalink: posts/{{ title | slug }}/index.html
date: '2026-01-09'
tags: [firefox]
---

I created a Firefox Extensions!! It is called [Embermarks](https://addons.mozilla.org/en-US/firefox/addon/embermarks1/) and it should help you discovering old and and/or forgotten bookmarks. It is also [open source](https://github.com/gruberb/embermarks).

And this is what it looks like:

<table>
  <tr>
    <td><img src="/images/embermarks-popup.png" width="300" alt="Embermarks popup"></td>
    <td><img src="/images/embermarks-settings.png" width="300" alt="Embermarks settings"></td>
  </tr>
  <tr>
    <td align="center"><em>Popup</em></td>
    <td align="center"><em>Settings</em></td>
  </tr>
</table>

### Why I created it

Part of my routine in December to clean up my digital landscape (I [left Apple Services](https://bastiangruber.ca/posts/mass-quitting-apple/) and [re-setup my Firefox profiles](https://bastiangruber.ca/posts/how-i-browse-the-web-in-2026/)), is to really clean up and just take with me into the new year which I actually (use | read | consume | need).

Bookmarks was another one. I am usually quite organized when it comes to my bookmarks, and store every article or things I want to read or watch in my [Are.na account](https://www.are.na/bastian-foreach-me-com/channels). But, one of the folders I have is "Exercises". Websites I store which hopefully improve my skills. For example:

* [Protohackers](https://protohackers.com)
* [Let's code a TCP/IP stack](https://www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/)
* [Cryptopals](https://cryptopals.com/)

Besides that, I sometimes bookmark YouTube channels instead of subscribing to them. They pollute my "Subscription" view with videos I usually don't consume, but a few times a year, I need recommendations or get inspired, and then I go to these channels and "browse". 

A year is busy, so I forget to actually go to these websites. And for some websites -real gems - I totally forgot I had them bookmarked. Hence, my next little side project: [Embermarks](https://addons.mozilla.org/en-US/firefox/addon/embermarks1/).

I always created my own little Firefox extensions in the past - whenver a website annoys me or I needed something quick, and needed JS code do something for me, I put it in a Firefox extension and feel so proud and powerful. This time around though, I wanted to do something "official" and publish it to [Firefox Addons](https://addons.mozilla.org/en-CA/firefox/).

I never really thought about how to properly create an extension, just quick and dirty. So here is a recipe for my future self in case I forget again what to do.

## 1. Starting a Firefox Extension Project

What files do you need? What's the minimal setup?

**Key files:**

- `manifest.json` — The extension's configuration file
- `background.js` — Background script for core logic
- `popup/` — UI that appears when clicking the extension icon
- `options/` — Settings page
- `icons/` — Extension icons (16, 32, 48, 96px)

**Links:**
- [Your first extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
- [Anatomy of an extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
- [manifest.json reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

## 2. Thinking About Firefox Extensions

What can extensions access? What are the boundaries? How does the permission model work?

- Extensions run in an isolated context
- Permissions must be declared in `manifest.json`
- Different script contexts: background scripts, content scripts, popup scripts
- Communication via `browser.runtime.sendMessage()`

**Links:**
- [WebExtensions API overview](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)
- [Permissions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions)
- [Background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts)
- [Content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)

## 3. Available Firefox Extension APIs

Which APIs did Embermarks use? Where to find what's available? 

**APIs used in Embermarks:**
- [`browser.bookmarks`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/bookmarks) — Access and traverse bookmarks
- [`browser.history`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history) — Get visit counts and last visit times
- [`browser.storage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) — Store settings and cache
- [`browser.runtime`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime) — Message passing between scripts

**Links:**
- [Full API list](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)
- [Browser support for APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs)

## 4. Prototyping the Extension

How to experiment with APIs? Where to test code before committing?

The `browser.*` APIs are only available to extensions, not in regular browser consoles. But you don't need to build anything — just create a folder with two files:

**manifest.json**
```json
{
  "manifest_version": 2,
  "name": "Playground",
  "version": "1.0",
  "permissions": ["bookmarks", "history", "storage"],
  "background": {
    "scripts": ["background.js"],
    "persistent": true
  }
}
```

**background.js**
```js
// Ready to play!
```

**To load it:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Select your `manifest.json` file
4. Click **Inspect** → Console tab

Now you can experiment:
```js
// See your bookmark structure
browser.bookmarks.getTree()

// Check visit data for a URL
browser.history.getVisits({url: "https://example.com"})

// Get all visits for a URL with timestamps
let visits = await browser.history.getVisits({url: "https://github.com"})
visits.map(v => new Date(v.visitTime))
```

<div class="info"> <code>"persistent": true</code> keeps the background script running. Without it, Firefox unloads the script when idle, and clicking Inspect shows a "Fallback Document" with no API access.
</div>

**Links:**
- [Debugging extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Debugging)
- [Extension Debugger](https://extensionworkshop.com/documentation/develop/debugging/)

## 5. Splitting the Code

How to organize the codebase? What goes where?

**Embermarks structure:**
```
embermarks/
├── manifest.json
├── background.js        # Core logic, bookmark analysis
├── popup/
│   ├── popup.html       # Popup UI
│   └── popup.js         # Popup interactions
├── options/
│   ├── options.html     # Settings page
│   └── options.js       # Settings logic
├── shared/
│   ├── styles.css       # Shared styles
│   └── ui.js            # Shared UI components
└── icons/
```

## 6. Communication via Messages

Extensions have **separate contexts** that can't directly call each other's functions.

The **background script** has access to the APIs and runs persistently. The popup and options pages are just HTML/JS that come and go. They communicate via `browser.runtime.sendMessage()`.

**Sending a message (from popup or options):**
```js
const settings = await browser.runtime.sendMessage({ action: "getSettings" });
```

**Receiving messages (in background.js):**
```js
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "getSettings":
      return getSettings();  // Return a Promise
      
    case "saveSettings":
      return saveSettings(message.settings);
  }
});

async function getSettings() {
  const result = await browser.storage.local.get("settings");
  return { ...DEFAULT_SETTINGS, ...result.settings };
}
```

The `action` field is just a convention — you're sending a plain object, so you can structure it however you like. The listener returns a Promise, which resolves back to the sender.

**Links:**
- [Message passing](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#communicating_with_background_scripts)
- [runtime.sendMessage()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage)
- [runtime.onMessage](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)

## 7. Bundling the Extension

How to package it for distribution?

**Using web-ext:**

```sh
> npm install -g web-ext
> web-ext build
```

This creates a `.zip` file in `web-ext-artifacts/` ready for submission.

**Links:**
- [web-ext tool](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
- [Packaging your extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Package_your_extension_)

## 8. Testing Locally

How to load and test the extension during development? 

**Two ways to test:**

1. about:debugging - Load temporary extension
   
- Go to `about:debugging#/runtime/this-firefox`
- Click "Load Temporary Add-on..."
- Select your `manifest.json`

2. web-ext run - Auto-reload on changes
   
```sh
> web-ext run
```

**Links:**
- [Temporary installation in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)
- [web-ext run](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#testing-out-an-extension)

## 9. Submitting to Firefox Add-ons

How to publish? What's the review process?

**Steps:**
1. Create account at [addons.mozilla.org](https://addons.mozilla.org/)
2. Go to Developer Hub → Submit a New Add-on
3. Upload your `.zip` file
4. Fill in listing details (description, screenshots, categories)
5. Submit for review

**Links:**
- [Submitting an add-on](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
- [Add-on policies](https://extensionworkshop.com/documentation/publish/add-on-policies/)
- [Review process](https://extensionworkshop.com/documentation/publish/what-does-review-rejection-mean-to-users/)
