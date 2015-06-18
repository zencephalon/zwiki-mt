Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("wikis");
  },
  action: function() {
    this.render("wiki", {data: function() {
      return Wiki.findOne({p: '/'});
    }});
  }
});
