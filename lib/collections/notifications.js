"use strict";

Polytunes.Notifications = new Mongo.Collection('notifications');

Polytunes.createNotification = function(roomId, message, variables) {
  var room = Polytunes.Rooms.findOne(roomId);
  Polytunes.Notifications.insert({
    roomId: room._id,
    message: message,
    variables: variables,
    timestamp: (new Date()).getTime()
  });
};
