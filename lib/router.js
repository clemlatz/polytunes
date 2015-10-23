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
  data: function() { return Rooms.findOne(this.params._id); }
});

// Uncomment to test loading page at /loading
// Router.route('/loading', {
//   name: 'loading'
// });

// Uncomment to test login page at /login
// Router.route('/login', {
//   name: 'login'
// });
