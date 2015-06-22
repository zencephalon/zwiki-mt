Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("wikis");
  },
  action: function() {
    this.render("wiki", {data: function() {
      return Wiki.findOne({root: true});
    }});
  }
});

Router.route('/w/:_id', function() {
  this.render("wiki", {data: function() {
    return Wiki.findOne({_id: this.params._id});
  }})
})