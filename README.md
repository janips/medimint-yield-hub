# Remix of Medimint Health Hub

Medimint Super App

Complete Product + UI/UX Description (Frontend-Focused)

Purpose of the App

The Medimint mobile app is the primary front-end experience for all MDMT token holders.
Its job is to make token holders feel:

✅ In control of their assets (linked machines, asset IDs, tokens)
✅ Confident about transparency (scan activity, daily transactions, yield history)
✅ Rewarded in real-time (yield notifications, staking rewards, health rewards)
✅ Able to use the token (marketplace purchases, services, packages)

The app should feel like a premium financial + wellness product, similar to a wealth dashboard + activity tracker + marketplace in one.

1) Core User Experience Principles

A) “Trust-first UI”

Everything must look clean, verified, and audit-friendly, with clear numbers and history.

B) “Yield feels real-time”

Even if settlement happens later, the user must feel continuous earning through:

activity feed

scan notifications

yield accumulation counters

C) “Asset ownership clarity”

The app must make it obvious:

how many tokens the user owns

which machine IDs they are linked to

how each machine is performing daily

D) “Utility makes token valuable”

Token is not just an investment—MDMT must feel like a currency inside the ecosystem:

marketplace purchases

rewards redemption

health and wellness benefits

2) App Navigation (Simple, Premium, Token Holder Friendly)

Bottom Tab Bar (Recommended)

Home

Assets

Activity

Marketplace

Rewards
(+ Profile/Settings accessible from top right)

This structure ensures all core features are visible without confusion.

3) Main Screens & UI/UX Mechanism (Detailed)

3.1 HOME (Token Holder Dashboard)

Goal

This is the “Investor cockpit” showing:

balance

yield

activity

performance

quick actions

Home Screen Layout (Top to Bottom)

A) Header

“Good Morning, [Name]”

Wallet/Account icon (top right)

B) Portfolio Summary Card (Hero Card)

Big, attractive card with:

Total MDMT Holdings

Total Asset Value (Estimated)

Today’s Yield Earned

Total Yield Earned (Lifetime)

Optional mini-indicators:

“+X% this month” (appreciation)

“Yield active” badge

C) Linked Assets Snapshot

Small row with:

“Machines Linked: 04”

“Assets IDs: 07”

“Staked Tokens: XXXX MDMT”

Tap → goes to Assets tab.

D) Daily Machine Performance Highlights

A clean section like:

Transactions Today: 128

Yield Events Today: 128

Highest Performing Machine Today: MRI-DXB-003

E) Graph Section (Beautiful, minimal)

Two toggle graphs:

Daily Transactions (7D / 30D / 90D)

Yield Earned (7D / 30D / 90D)

F) Latest Yield Feed (Real-time Activity)

Shows last 5–10 yield events:

Time

Machine ID

“Yield generated”

Hash reference (tap to expand)

Example row:

10:21 AM • MRI-DXB-003 • Yield Generated • Hash: 0xA9…F3

G) Quick Action Buttons

“Stake MDMT”

“Explore Marketplace”

“Claim Rewards”

“View Assets”

3.2 ASSETS (Token ↔ Machine ID clarity)

Goal

This section gives absolute clarity on ownership and linkage:

tokens

asset IDs

machine IDs

performance per asset

Assets Tab Structure

Use 3 sub-tabs:

Tab 1: My Tokens

Display:

Total MDMT

Available MDMT

Staked MDMT

Rewards Pending

Next Reward Date / Cycle (if applicable)

Also show:

Token Appreciation (Estimated)

“Your token performance” indicator

Tab 2: Linked Machines

A list of machines, each in a premium card format:

Each machine card must show:

Machine ID

Machine type (MRI / CT / etc.)

Location (optional)

Status: Active / Offline / Under Maintenance

Transactions Today

Yield Today

“View Details” CTA

Machine Details Screen (Deep Dive)

When user taps a machine:

Machine ID (top)

Performance stats:

Transactions today

Transactions this week

Yield generated today

Yield generated this month

Chart: daily transactions trend

“Yield Events” list for that machine

Hash history (expandable)

This makes the “token linked to which machine ID” extremely clear.

Tab 3: Asset IDs

This is important for token holders psychologically (ownership identity).

Asset ID list shows:

Asset ID (example: ASSET-000392)

Linked Machine ID

Tokens allocated / linked

Current yield rate (estimated)

Total yield earned from this asset

Asset ID Detail Screen

Asset ID overview

Machine mapping

Yield history

Event log with hashes

3.3 ACTIVITY (Notifications + Daily Transactions + Yield Events)

Goal

This is the transparency layer:

every scan triggers a yield event

every event has a hash reference

daily totals are visible and filterable

Activity Screen Sections

Use 3 tabs:

Tab 1: Yield Events

List format:

Time

Machine ID

Yield generated

Hash reference

Filters:

Date range

Machine ID

Highest yield first

Most active machine

Each event detail expands to show:

Machine ID

Timestamp

Hash reference

Yield amount credited / pending

Settlement status (if applicable)

Tab 2: Daily Transactions

This is exactly what you requested.

A calendar-based list:

Date → Total Transactions → Yield Generated

Example:

Jan 28 — 164 Transactions — 0.84 MDMT

Jan 27 — 139 Transactions — 0.72 MDMT

Also allow:

Machine-wise breakdown inside each day

Tab 3: Notifications

This is a dedicated in-app notification center.

Notification types:

Yield Generated (scan transaction occurred)

Staking Reward Credited

Asset Appreciation Update

Marketplace Order Updates

Rewards Claimed Successfully

Every “Yield Generated” notification must contain:

Machine ID

Hash reference

Quick CTA: “View Event”

3.4 STAKING (Rewards & Passive Earnings)

Goal

Staking must feel like a premium earning feature.

Staking UI should show:

Total staked MDMT

APY / reward rate (if defined)

Next reward date/time

Total staking rewards earned

“Claim rewards” button (if manual claim)

“Auto-compound ON/OFF” (optional)

Staking history list:

reward date

amount

reference ID / hash (if available)

3.5 MARKETPLACE (Utility & Spending MDMT)

Goal

Make MDMT feel like a usable token, not just a holding.

Marketplace Home

Category tiles:

Health Packages

Doctor Online Consultation

Supplements

Wellness Programs

Diagnostics / Longevity Plans (if applicable)

Each item card shows:

Title

Short benefit line

Price in MDMT

“Buy Now”

Product Detail Page

Must include:

Full description

What’s included

Delivery method:

instant voucher / booking / shipping

Price in MDMT

“Pay with MDMT” button

Checkout UX

Should feel like a wallet payment:

item price

taxes/shipping (if any)

total MDMT

confirmation screen

success receipt + reference ID

3.6 REWARDS (Steps + Calories → Earn MDMT)

Goal

This is the engagement engine that keeps users returning daily.

Rewards Dashboard

Shows:

Today’s Steps

Calories Burned

MDMT Earned Today

Weekly streak bonus (optional)

Rewards Earning Mechanism (UI)

A progress ring for steps (e.g., 10,000 steps goal)

“Earn rate” displayed clearly:

Example: “Every 1,000 steps = X MDMT”

“Every 100 calories = X MDMT”

Rewards Wallet (Ledger)

List view:

Date

Steps

Calories

MDMT earned

Status: credited / pending / claimed

Claim Rewards

A clean “Claim MDMT” action that adds tokens to wallet balance.

4) The “Yield Notification Mechanism” (User View Only)

Every time a patient transaction happens on a linked machine:

User receives:

Push notification + in-app notification

Example notification:

✅ Your asset generated yield
Machine: MRI-DXB-003
Hash: 0x91F…2C9

When user taps it, it opens:

Yield event detail screen

The machine details

The event log entry

This is critical to create the feeling of real-time earning + transparency.

5) Visual Style & UI Quality Standards (Must be Premium)

UI tone

Minimal

Elegant

High trust

“Wealth + Health” combined

Recommended design language

Clean typography

Smooth animations (subtle)

Rounded cards

Dark mode optional (token users love it)

Graphs should be smooth and modern

Key UI elements that must feel premium

Yield counters

Daily transaction graphs

Notification feed

Asset ID cards

Staking summary

6) What the App Must Always Show (Non-Negotiable)

For every token holder:

✅ Tokens owned
✅ Tokens staked
✅ Total yield earned
✅ Yield today
✅ Linked machine IDs
✅ Daily transactions count
✅ Yield event notifications with hash
✅ Marketplace spending
✅ Rewards earning via steps/calories

7) Suggested “Perfect First Impression” Flow (for Token Holders)

When a token holder opens the app for the first time:

Welcome → wallet connected

Home shows:

“Your assets are active”

“Machines linked: X”

“Today’s yield: …”

Activity feed shows recent events

A tooltip explains:

“Each scan triggers a yield event”

“Each event has a hash for transparency”

Marketplace + Rewards is visible immediately

This makes the app feel alive and valuable from Day 1.

8) Deliverables Summary (What developer/design team should build)

Must-have Screens

Home Dashboard

Assets (Tokens / Machines / Asset IDs)

Activity (Yield events / Daily totals / Notifications)

Staking (Rewards + history)

Marketplace (browse + purchase)

Rewards (steps/calories + claim)

Profile/settings

Must-have UI behaviors

Real-time yield feed

Push notifications with hash

Daily transaction count view

Machine-wise breakdown

Token appreciation and earnings visibility

Marketplace MDMT payments

Fitness reward conversion + ledger

If you want, I can now convert this into a clean “App UI/UX Specification PDF-style format” (sections + screen blocks + exact labels + user journey) so your designer + developer can execute it without confusion.

 



Use https://www.medimint.io/ website for the Logo and other branding referece.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://medimint-yield-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4204c118-c86e-4b17-ad1a-df2023c48cfb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
