Meteor.startup( function() {
  AccountsGuest.name = true;
  AccountsGuest.anonymous = true;
});

Meteor.publish('rooms', function() {
    return Rooms.find();
});

Rooms.allow({
  insert: ()=> false,
  update: ()=> false,
  remove: ()=> false
});
