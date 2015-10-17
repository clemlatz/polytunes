# Polytunes

![Polytunes](https://pbs.twimg.com/media/CQ_poKHWwAAKpLq.png)

Polytunes is a collaborative music game playable in the browser and on touch devices. The goal is to create melodies by collaborating without speaking to (or event knowing!) other players. If you don't feel like composing you can just watch and listen to others creating music in real-time.

## Inspirations

Polytunes inspirations are Yamaha's [Tenori-on](http://usa.yamaha.com/products/musical-instruments/entertainment/tenori-on/tnr-o/), André Michelle's [Tonematrix](http://tonematrix.audiotool.com/) and Steve Reich's experiments on [Phasing](https://en.wikipedia.org/wiki/Phasing_(music)).

[Learn more about Polytunes' creation on our Devpost page](http://devpost.com/software/polytunes)

## Live demo

http://polytunes.es/

## Installation

1. Install [Meteor](https://www.meteor.com/) `curl https://install.meteor.com/ | sh`
2. Clone this repo `git clone git@github.com:iwazaru/polytunes.git`
3. Change directory `cd polytunes`
4. Run the app `run meteor`
5. Go to http://localhost:3000/
6. Enjoy.

## Contributors

Polytunes' first version was built in 24 hours during the [2015 Meteor Global Distributed Hackathon] by [Clément Bourgoin](https://github.com/iwazaru), [William Hollacsek](https://github.com/whollacsek), [Nori Beydoon](https://github.com/nbeydoon) and [William Mai](https://github.com/wmai), mostly Meteor first-timers, and was awarded with the [People's Choice Award (3rd rank)](http://info.meteor.com/blog/meteor-global-distributed-hackathon-winners).

Other contributors are [listed on Github](https://github.com/iwazaru/polytunes/graphs/contributors).

## Changelog

0.5 (2015-10-17)
* Click-and-hold to play a note, release mouse button to add it to the board, 
or release outside of the board to cancel
* Added shorcut: press spacebar to toggle playback
* Playback cursor is reset when playback is paused
* Revamped note handling to improve performances
* Set volume to 0.1 to avoid sound saturation
* Added loading message while loading app or room
* Revamped design, added fonts and favicon
* Improved cell animations when played
* Added a link to Polytune's Facebook page

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
