Wikis = new Meteor.Collection("wikis");

Wikis.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return userId;
  },
  fetch: ['uid']
});

Wiki = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Wiki.create = function(o) {
  _.defaults(o, {createdAt: new Date(), updatedAt: new Date(), title: "Untitled", text: "", count: 0});
  if (o['title'] && ! o['slug']) {
    o['slug'] = Wiki.slugify(o['title']);
  }

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

Wiki.prototype.save = function(update) {
  update['slug'] = Wiki.slugify(update['title']);
  this.update(update);
}

Wiki.slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

Wiki.makeLink = function(id) {
  return "/w/" + id;
}

Wiki.subscriptions = function() {
  Meteor.publish("wikis", function() { return Wikis.find({}); });

  Meteor.publish("wiki", function(_id) {
    return Wikis.find({_id: _id});
  });

  Meteor.publish("wikis_small", function() {
    return Wikis.find({}, {fields: {slug: 1}});
  })

  Meteor.publish("wiki_root", function() {
    return Wikis.find({root: true});
  });

  // Meteor.publish("search", function(searchValue) {
  //   if (!searchValue) {
  //     return Wikis.find({uid: this.userId}, {limit: 25, sort: {createdAt: -1}});
  //   }
  //   return Wikis.find(
  //     { $text: {$search: searchValue}, uid: this.userId },
  //     {
  //       fields: { score: { $meta: "textScore" } },
  //       sort: { score: { $meta: "textScore" } },
  //       limit: 25
  //     }
  //   );
  // });
}