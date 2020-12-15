# pihole-block-video
PiHole List for blocking Video Sites

## How to use

Add this into your Blocklist: https://raw.githubusercontent.com/wilwade/pihole-block-video/master/hosts.txt

## About

I wanted a way to block all the various video sites. This is the start of a list that will do that.

## What does it block?

Currently it lists all the main domains from https://en.wikipedia.org/wiki/List_of_online_video_platforms and nothing else.

This means that it blocks YouTube and other popular sites. I suggest whitelisting sites desired to still allow.

## TODO
- List other websites
- List the embeded versions of these sites

## Build
- `npm install`
- `node pull.js > hosts.txt`

