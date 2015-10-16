Instrument = class Instrument {
  getWad() {
    var settings = {
      volume: .1,
      source: 'sine',
    };
    return new Wad(settings);
  }

  playNote(frequency) {
    var wad = this.getWad()
    var duration = 60 / Rooms.findOne().tempo * 1000 / 4;
    wad.play({
      pitch: frequency,
      env : {
        decay: duration / 1000 * .1,
        hold: duration / 1000 * 1.1,
        release: duration / 1000 * .75,
      },
      reverb: {
        wet: 0,
      }
    });
  }
}
