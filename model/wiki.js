Wikis = new Meteor.Collection("wikis");

Wikis.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.uid === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.uid === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.uid === userId;
  },
  fetch: ['uid']
});

Wiki = function(0) {
  for (p in o) {
    this[p] = o[p];
  }
}

Wiki.create = function(o) {
  
}