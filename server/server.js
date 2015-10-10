Meteor.startup(function () {
// code to run on server at startup
});

if (Rooms.find().count() === 0) {
  Rooms.insert({
  	isPublic: true
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
