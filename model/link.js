Links = new Meteor.Collection("links");

Links.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    return userId;
  },
  remove: function (userId, doc) {
    return userId;
  },
  fetch: ['uid']
});

Link = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}