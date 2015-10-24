Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('rooms'); }
});

Router.onBeforeAction('dataNotFound', { only: 'roomPlay' });

Router.route('/', {
  name: 'home'
});

Router.route('/room/:_id', {
  name: 'roomPlay',
  data: function() { return { room: Rooms.findOne(this.params._id) }; },
  onRun: function() {
    let room = Rooms.findOne(this.params._id);
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
