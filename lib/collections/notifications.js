"use strict";

Polytunes.Notifications = new Mongo.Collection('notifications');

Polytunes.createNotification = function(roomId, message) {
  var room = Polytunes.Rooms.findOne(roomId);
  Polytunes.Notifications.insert({
    roomId: room._id,
    message: message,
    timestamp: (new Date()).getTime()
  });
};
