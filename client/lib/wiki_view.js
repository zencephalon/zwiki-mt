WikiView = {
  focus: function(wiki_id) {
    Session.set("focusedWiki", wiki_id);
  },
  focusedId: function() {
    return Session.get("focusedWiki")
  },
  focusedWiki: function() {
    return Wiki.findOne(Session.get("focusedWiki"));
  },
  focusedWikiElement: function() {
    var focusedId = this.focusedId();
    if (focusedId) {
      return $("div.wiki[data-id=" + this.focusedId() + "]");
    }
  },
  saveFunction: function() {
    var $focusedWiki = WikiView.focusedWikiElement();
    if ($focusedWiki) {
      var $ele = $focusedWiki;
      var $content = $ele.children('.content');
      var $title = $ele.children('.title');

      var content = $content.html();

      var child_content = $.map($content.children('.wiki'), function(ele) {return ele.outerHTML});

      child_content.forEach(function(c) {
        content = content.replace(c, "");
      })

      content = content.replace(/\ open-link="true"/g, "");
      content = content.replace(/\ open-link/g, "");

      var t = $title.text();
      var wiki = Wiki.findOne($ele.data('id'));
      wiki.save({title: t, text: content});
    }
  }
}