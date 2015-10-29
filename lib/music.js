"use strict";

Polytunes.Music = function() {};

Polytunes.Music.prototype = {

  SCALE_VALUES: {
      MAJOR: [2, 2, 1, 2, 2, 2, 1],
      MINOR: [2, 1, 2, 2, 1, 2, 2],
      MINOR_HARMONIC: [2, 1, 2, 2, 1, 3, 1],
      MINOR_MELODIC: [2, 1, 2, 2, 2, 2, 1],
      PENTATONIC_MAJOR: [2, 2, 3, 2, 3],
      PENTATONIC_MINOR: [3, 2, 2, 3, 2],
      BLUES: [3, 2, 1, 1, 3, 2],
      NONE: [1, 1]
  },

  // Calculate note from base and interval
  calcNote: function (base, interval) {
    return Math.round(base * Math.pow(2,interval/12)*100)/100;
  },

  // Get 'max' notes of 'scale' from 'base'
  getScaleNotes: function (scale, base, max) {
    let interval = 0,
      note = null,
      ni = 0,
      notes = [];

    for(let n = 0; n < max; n++) {
      note = this.calcNote(base,interval);
      interval = interval + scale[ni];
      notes[n] = note;
      ni++;
      if (ni >= scale.length) ni = 0;
    }

    return notes;
  }
}
