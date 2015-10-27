Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('rooms'); }
});

Router.onBeforeAction('dataNotFound', { except: 'home' });

Router.route('/', {
  name: 'home'
});

Router.route('/room/:_id', {
  name: 'roomPlay',
  data: function() {
    let room = Rooms.findOne(this.params._id)
    if (room) {
      return { room: room }
    }
  },
  onRun: function() {
    let room = Rooms.findOne(this.params._id);

    // If room is full, redirect to watch mode
    if (room.players.length >= 2) {
      Router.go("roomWatch", { _id: room._id });
    }

    Session.set("currentRoom", room);
    Meteor.call("userJoinsRoom", this.params._id);
    this.next();
  },
  onStop: function() {
    Meteor.call("userLeavesRoom", this.params._id);
    if (Session.get('playing')) {
      togglePlay();
    }
  }
});

Router.route("/room/:_id/watch", {
  name: "roomWatch",
  data: function() {
    let room = Rooms.findOne(this.params._id)
    if (room) {
      return { room: room }
    }
  },
  onBeforeAction: function() {
    let room = Rooms.findOne(this.params._id);
    Session.set("currentRoom", room);
    this.next();
  }
});

// // Uncomment to test loading page at /loading
// Router.route('/loading', {
//   name: 'loading'
// });
//
// // Uncomment to test login page at /login
// Router.route('/login', {
//   name: 'login'
// });
//
// // Uncomment to test 404 page at /404
// Router.route('/404', {
//   name: 'notFound'
// });
