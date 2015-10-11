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
        tempo: 120,
        createdAt: new Date()
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

Meteor.publish(null, function() {
  return Connections.find();
});

// server code: heartbeat method
Meteor.methods({
  keepalive: function (data) {
    if (!Connections.findOne({user_id: data.id})) {
      console.log("User "+data.user_id+" enters");
      Connections.insert({user_id: data.id, name: data.name});
    }
    Connections.update({user_id: data.id}, {$set: {last_seen: (new Date()).getTime()}});
  }
});

// server code: clean up dead clients after 10 seconds
Meteor.setInterval(function () {
  var now = (new Date()).getTime();
  Connections.find({last_seen: {$lt: (now - 10 * 1000)}}).forEach(function (user) {
    console.log("User "+user.user_id+" has disconnected");
    Connections.remove(user);
  });
});
