if (Rooms.find().count() === 0) {
    Meteor.call('createRoom');
}

Meteor.publish('rooms', function() {
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
    if (!data.name) return
    if (!Connections.findOne({user_id: data.id})) {
      console.log("User "+data.name+" enters");

      Connections.insert({user_id: data.id, name: data.name, color: data.color});
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
