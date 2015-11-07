# Polytunes

![Polytunes](https://pbs.twimg.com/media/CQ_poKHWwAAKpLq.png)

Polytunes is a collaborative music game playable in the browser and on touch devices. The goal is to create melodies by collaborating without speaking to (or event knowing!) other players. If you don't feel like composing you can just watch and listen to others creating music in real-time.

Follow Polytunes on [Facebook](https://www.facebook.com/playpolytunes) and [Devpost](http://devpost.com/software/polytunes)

## Inspirations

Polytunes inspirations are Yamaha's [Tenori-on](http://usa.yamaha.com/products/musical-instruments/entertainment/tenori-on/tnr-o/), André Michelle's [Tonematrix](http://tonematrix.audiotool.com/) and Steve Reich's experiments on [Phasing](https://en.wikipedia.org/wiki/Phasing_(music)).

[Learn more about Polytunes' creation on our Devpost page](http://devpost.com/software/polytunes)

## Live demo

http://polytun.es/

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

0.7 (2015-11-07)
* Added a solo play mode
* Added notifications when player joins or watch
* Fixed player not disconnected after timeout
* Fixed browser language detection on Safari
* Prevented player joining a room before entering a name
* Prevented player deleting notes from other's players side

0.6 (2015-10-29)
* Polytunes is now a two-player game: invite a friend or play with a complete
random stranger
* Multiple rooms can be created: public room that can be joined by anyone and
private rooms that only users knowing the url can join
* The board is divided in two sides, each player can only play on its side
* Only two player can play in the same room, but if more players join the room,
they can watch
* If a player is alone in a room, a waiting message will be displayed
* Added internationalization and french translations

0.5.1 (2015-10-19)
* Fixed user timeout setInterval interval

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
