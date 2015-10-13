# Polytunes

![Polytunes](https://pbs.twimg.com/media/CQ_poKHWwAAKpLq.png)

Polytunes is a music pad built using Meteor and HTML5's WebAudio API under 24h during the [2015 Meteor Global Distributed Hackathon](http://meteor-2015.devpost.com/).

## Idea

Polytunes is inspired by Yamaha's Tenori-on and Steve Reich's experiments on [Phasing](https://en.wikipedia.org/wiki/Phasing_(music)). The idea was to build a sequencer/synthetizer using only HTML5 (no Flash or sound files) and make it online and multiplayer using Meteor. Multiple players can join and update the melody on-the-go. All changes are instantly pushed to all other players.

[Learn more on Polytune's Devpost page](http://devpost.com/software/polytunes)

## Live demo

https://polytunes.scalingo.io

## Installation

1. `git clone git@github.com:iwazaru/polytunes.git`
2. `cd polytunes`
3. `run meteor`
4. Go to http://localhost:3000/
5. Enjoy.

## Team

Mostly Meteor first-timers, the Polytunes team is composed of:
* [iwazaru](https://github.com/iwazaru)
* [whollacsek](https://github.com/whollacsek)
* [nbeydoon](https://github.com/nbeydoon)
* [wmai](https://github.com/wmai)

## Changelog

0.4 (2015-10-13)
* Added players name with colour under the board
* Revamped play button to show current status (play/pause)
* Added links to github repo and devpost page
* Fixed player creation on login

0.3 (2015-10-11)
* Added a tooltip with player name on cells
* Added a tooltip with players list on players count

0.2 (2015-10-11)
* Display number of connected players
* Added iOS support

0.1 (2015-10-10)
* First release with minimum viable product
