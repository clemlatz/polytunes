if (Rooms.find().count() === 0) {
    Rooms.insert({
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
            scale: SCALE_VALUES.PENTATONIC_MINOR
        },
        tempo: 120
    });
}

Meteor.publish(null, function() {
    return Rooms.find();
});

Rooms.allow({
  insert: ()=> false,
  update: ()=> false,
  remove: ()=> false
});
