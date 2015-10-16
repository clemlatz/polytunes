Music = function() {};

Music.prototype = {
  
  // Calculate note from base and interval
  calcNote: function (base, interval) {
    return Math.round(base * Math.pow(2,interval/12)*100)/100;
  },

  // Get 'max' notes of 'scale' from 'base'
  getScaleNotes: function (scale, base, max) {
    interval = 0;
    ni = 0;
    notes = new Array();
    ints = new Array();
    for(n = 0; n < max; n++) {
      note = this.calcNote(base,interval);
      interval = interval + scale[ni];
      ints[n] = scale[ni];
      notes[n] = note;
      ni++;
      if (ni >= scale.length) ni = 0;
    }
    return notes;
  }
}