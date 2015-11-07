"use strict";

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('rooms'), Meteor.subscribe('notifications')]; }
});

Router.onBeforeAction('dataNotFound', { except: 'home' });

Router.route('/', {
  name: 'home'
});

Router.route('/join', {
  name: 'join'
});

Router.route('/create', {
  name: 'create'
});

Router.route('/room/:_id', {
  name: 'roomPlay',
  data: function() {
    let room = Polytunes.Rooms.findOne(this.params._id)
    if (room) {
      return { room: room }
    }
  }
});

Router.route("/room/:_id/watch", {
  name: "roomWatch",
  data: function() {
    let room = Polytunes.Rooms.findOne(this.params._id)
    if (room) {
      return { room: room }
    }
  }
});

Router.route("/solo", {
  name: "solo",
  data: function() {
    let room = new Polytunes.Room();
    if (room) {
      return { room: room }
    }
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
