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
  action: function() {
    let room = Rooms.findOne(this.params._id);
    Session.set("currentRoom", room);
    Meteor.call("userJoinsRoom", room._id);
    this.render();
  },
  onStop: function() {
    Meteor.call("userLeavesRoom", this.params._id);
    if (Session.get('playing')) {
      togglePlay();
    }
  }
});

// Uncomment to test loading page at /loading
// Router.route('/loading', {
//   name: 'loading'
// });

// Uncomment to test login page at /login
// Router.route('/login', {
//   name: 'login'
// });
