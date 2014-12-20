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

Wiki = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Wiki.create = function(o) {
  id = Wikis.insert(o);
  o['_id'] = id;

  return new Wiki(o);
}

Wiki.findOne = function(o) {
  return new Wiki(Wikis.findOne(o));
}

Wiki.prototype.update = function(update) {
  if (update === undefined) {
    o = {};
    for (p in this) {
      if (p != '_id') {
        o[p] = this[p];
      }
    }
    Wikis.update(this._id, {"$set": o});
  } else {
    Wikis.update(this._id, {"$set": update});
  }
}