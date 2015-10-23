if (Meteor.isClient) {

  // Ping server every 5 seconds
  Meteor.setInterval(function () {
    Meteor.call("userPings");
  }, 5000);

  // If user close the windows, warn server
  window.addEventListener("beforeunload", function() {
    Meteor.call("userLeaves");
  }, false);
}

if (Meteor.isServer) {

  // Receive ping
  Meteor.methods({
    userPings: function (data) {
      Meteor.users.update(Meteor.user(), {
        $set: {
          lastSeenAt: (new Date()).getTime(),
          'profile.online': true
        }
      });
    },
    userLeaves: function(sent_user) {
      let user = sent_user || Meteor.user(),
        name = user.profile.name || user._id;
      Meteor.users.update(user, { $set: { 'profile.online': false } });
      console.log(`User ${name} left.`);
    }
  },

);

  // Clean up dead clients after 10 seconds
  Meteor.setInterval(function () {
    let now = (new Date()).getTime();
    Meteor.users.find({ 'profile.online': true, lastSeenAt: { $lt: (now - 10 * 1000) }}).forEach(function (user) {
      Meteor.call('userLeaves', user);
    });
  }, 1000);
}
