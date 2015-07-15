WikiView = {
  focus: function(wiki_id) {
    Session.set("focusedWiki", wiki_id);
  },
  focusedId: function() {
    return Session.get("focusedWiki")
  },
  focusedWiki: function() {
    return Wiki.findOne(Session.get("focusedWiki"));
  }
}