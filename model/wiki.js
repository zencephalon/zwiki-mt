Wikis = new Meteor.Collection("wikis");

Wikis.allow({
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

Wiki = function(o) {
  for (p in o) {
    this[p] = o[p];
  }
}

Wiki.create = function(o) {
  _.defaults(o, {createdAt: new Date(), updatedAt: new Date(), title: "Untitled", text: "ILUVU.", count: 0, links: [], revisions: []});
  if (! o['slug']) {
    o['slug'] = Wiki.slugify(o['title']);
  }
  o['links'] = Wiki.extractLinks(o['text']);
  o['count'] = Wiki.countWords(o['text']);

  var id = Wikis.insert(o);
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
    o['updatedAt'] = new Date();
    Wikis.update(this._id, {"$set": o});
  } else {
    update['updatedAt'] = new Date();
    Wikis.update(this._id, {"$set": update});
  }
}

Wiki.prototype.save = function(update) {
  update['slug'] = Wiki.slugify(update['title']);
  update['links'] = Wiki.extractLinks(update['text']);
  update['count'] = Wiki.countWords(update['text']);

  if ((new Date() - this.updateAt) > 1000 * 60 * 5) {
    this.revisions.push(this.text);
    update['revisions'] = this.revisions;
  }

  this.update(update);
}

Wiki.prototype.subscribeToLinked = function() {
  this.links.forEach(function(link_id) {
    Meteor.subscribe("wiki", link_id);
  });
}

Wiki.slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

Wiki.extractLinks = function(text) {
  var regex = /href=["']\/w\/(.*?)["']/g;
  var links = []
  while (match = regex.exec(text)) {
    links.push(match[1]);
  }
  return links;
}

Wiki.makeLink = function(id) {
  return "/w/" + id;
}

Wiki.countWords = function(text) {
  var regex = /\s+/gi;
  return text.trim().replace(regex, ' ').split(' ').length;
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

  Meteor.publish("search", function(searchValue) {
    if (!searchValue) {
      return Wikis.find({}, {limit: 25, sort: {createdAt: -1}});
    }
    return Wikis.find(
      { $text: {$search: searchValue}},
      {
        fields: { score: { $meta: "textScore" } },
        sort: { score: { $meta: "textScore" } },
        limit: 25
      }
    );
  });
}