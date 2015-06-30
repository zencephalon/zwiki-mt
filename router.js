Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  Meteor.call("totalWordCount", function(error, result) {
    Session.set("totalWordCount", result);
  });

  Meteor.subscribe("wikis_small");
  this.next();
})

Router.route('/', {
  waitOn: function() {
    return Meteor.subscribe("wiki_root");
  },
  action: function() {
    var wiki = Wiki.findOne({root: true})
    wiki.subscribeToLinked();

    this.render("wiki", {data: function() {
      return wiki;
    }});
  }
});

Router.route('/z/search', function() {
  this.wait(Meteor.subscribe("search", Session.get("searchVal")));

  this.render('wiki_search');
});

Router.route('/z/new', function() {
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
    var wiki = Wiki.findOne({_id: this.params._id});
    wiki.subscribeToLinked();
    this.render("wiki", {data: wiki});
  } else {
    this.render("loading");
  }
});

Router.route('/w/:_id', function() {
  this.wait(Meteor.subscribe('wiki', this.params._id));
  if (this.ready()) {
    var wiki = Wiki.findOne({_id: this.params._id});
    this.redirect('/w/' + this.params._id + '/' + wiki.slug);
  } else {
    this.render("loading");
  }
});