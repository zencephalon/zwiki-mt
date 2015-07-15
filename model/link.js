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

Link.create = function(o) {
  _.defaults(o, {createdAt: new Date(), updatedAt: new Date()});

  var id = Links.insert(o);
  o['_id'] = id;
  o['html'] = '<a href="' + Wiki.makeLink(o.target) + '" data-id="' + id + '">' + o.label + '</a>'

  return new Wiki(o);
}