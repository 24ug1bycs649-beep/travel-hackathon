# Contributing Workflow (Hackathon — 3 people, 5 days)

Lightweight process. Goal is speed without stepping on each other.

## Rules

1. main branch is always demo-ready. Never push directly to main. It should always be in a state you could demo at any moment.

2. Branch off main for your feature.
   git checkout main
   git pull
   git checkout -b feature/short-name

   Commit small and often — don't sit on a giant uncommitted change.

3. Open a PR when your feature works end-to-end (even if rough/unpolished). The other 2 members do a quick sanity-check merge — no strict review process, we don't have time. The bar is: does it break anything obvious. Not: is this clean code.

4. Start each day by syncing with main.
   git checkout main
   git pull
   git checkout feature/your-branch
   git merge main

   Do this before starting new work each day, to avoid big conflicts building up later.

5. Touching a shared or same file as someone else? Message the group first. Avoid two people editing the same file in parallel when possible — that's the number one source of painful merges under time pressure.

## Quick Reference

Start new work:
   git checkout main
   git pull
   git checkout -b feature/my-thing

Save progress:
   git add .
   git commit -m "short description of what changed"
   git push -u origin feature/my-thing

Open PR on GitHub, get a quick sanity check, merge into main.

Next day — resync before continuing:
   git checkout main
   git pull
   git checkout feature/my-thing
   git merge main
