Template.wiki_search.helpers({
  wikis: function() {
    Meteor.subscribe("search", Session.get("searchVal"));
    if (Session.get("searchVal")) {
      return Wikis.find({}, { sort: [["score", "desc"]] });
    } else {
      return Wikis.find({});
    }
  },
  // totalWordCount: function() {
  //   return Session.get("totalWordCount");
  // },
  searchVal: function() {
    return Session.get("searchVal");
  }//,
  // settings: function() {
  //   return {
  //     position: "bottom",
  //     limit: 5,
  //     rules: [{
  //       token: '#',
  //       replacement: '#',
  //       collection: Tags,
  //       field: "name",
  //       template: Template.tag_preview
  //     }]
  //   }
  // }
});

Template.wiki_search.rendered = function() {
  $('#search').focus();
}

Template.wiki_search.throttled_search = _.throttle(function(event) {
  Session.set("searchVal", $(event.target).val());
}, 200)

Template.wiki_search.events({
  'keyup #search': Template.wiki_search.throttled_search,
  'submit form': function(event) {
    event.preventDefault();
  }
})