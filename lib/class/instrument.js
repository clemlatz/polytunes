class Instrument {
  getWad() {
    return new Wad({source : 'sine'});
  }

  playNote(frequency) {
    var wad = this.getWad()
    wad.play({
      pitch : frequency,  // A4 is 440 hertz.
      env : {
        decay: duration / 1000 * .1,
        hold: duration / 1000 * 1.1,
        release: duration / 1000 * .75
      },
      reverb: {
        wet: 1
      }
    });
  }
}
