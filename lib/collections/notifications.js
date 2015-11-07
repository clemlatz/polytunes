"use strict";

Polytunes.Notifications = new Mongo.Collection('notifications');

Polytunes.createNotification = function(roomId, message, variables, options) {
  var room = Polytunes.Rooms.findOne(roomId);
  Polytunes.Notifications.insert({
    roomId: room._id,
    message: message,
    variables: variables,
    options: options,
    timestamp: (new Date()).getTime()
  });
};
