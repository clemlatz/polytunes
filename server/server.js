Meteor.startup( function() {
  AccountsGuest.name = true;
  AccountsGuest.anonymous = true;
});

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

// Publish online user list
Meteor.publish('players', function() {
  return Meteor.users.find({ 'profile.online': true, 'profile.name': { $exists: true } }, { fields: { 'profile': 1 } });
});
