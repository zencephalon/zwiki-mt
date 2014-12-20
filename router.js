Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("wikis");
  },
  action: function() {
    this.render("root");
  }
});
