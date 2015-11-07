"use strict";

Polytunes.Room = function (room) {
  let music = new Polytunes.Music();
  room = _.extend({
      isPublic: true,
      board: {
          width: 16,
          height: 16
      },
      players: [],
      partition: [],
      synthetizer: {
          base: 260,
          wave: "sine",
          scale: music.SCALE_VALUES.MAJOR
      },
      tempo: 120,
      createdAt: new Date(),
      createdBy: Meteor.userId()
  }, room);

  let notes = (new Polytunes.Music()).getScaleNotes(room.synthetizer.scale, room.synthetizer.base, room.board.height);
  for (let y = 0; y < room.board.height; y++) {
    for (let x = 0; x < room.board.width; x++) {
      let frequency = notes[room.board.width-y-1];
      room.partition.push(new Polytunes.Cell(x,y,frequency));
    }
  }

  return room;
}
