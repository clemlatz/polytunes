"use strict";

Meteor.startup( function() {
  AccountsGuest.name = true;
  AccountsGuest.anonymous = true;
});

Meteor.publish('rooms', function() {
    return Polytunes.Rooms.find();
});

Polytunes.Rooms.allow({
  insert: ()=> false,
  update: ()=> false,
  remove: ()=> false
});
