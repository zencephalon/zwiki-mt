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

Router.route('/w/new', function() {
  if (Meteor.userId()) {
    var wiki = Wiki.create({uid: Meteor.userId()});

    this.redirect('/w/' + wiki._id);
  } else {
    this.redirect('/');
  }
});

Router.route('/w/:_id/:slug', function() {
  this.wait(Meteor.subscribe('wiki', this.params._id));
  if (this.ready()) {
    var wiki = Wikis.findOne({_id: this.params._id});
    this.render("wiki", {data: wiki});
  } else {
    this.render("loading");
  }
});

Router.route('/w/:_id', function() {
  this.wait(Meteor.subscribe('wiki', this.params._id));
  if (this.ready()) {
    var wiki = Wikis.findOne({_id: this.params._id});
    this.redirect('/w/' + this.params._id + '/' + wiki.slug);
  } else {
    this.render("loading");
  }
});