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
  selectLink: function(link_id) {
    return $("a[data-id=" + link_id + "]");
  },
  focusLink: function(link_id) {
    var $focusedLink = this.focusedLinkElement();
    if ($focusedLink) {
      $focusedLink.removeClass("focused_link");
    }
    this.selectLink(link_id).addClass("focused_link");
    Session.set("focusedLink", link_id);
  },
  focusedLinkId: function() {
    return Session.get("focusedLink");
  },
  focusedLinkElement: function() {
    var focusedId = this.focusedLinkId();
    if (focusedId) {
      return this.selectLink(focusedId);
    }
  },
  focusNextLink: function() {
    var $focusedLink = this.focusedLinkElement();
    if ($focusedLink) {
      this.focusLink($focusedLink.next('a'));
    } else {
      this.focusLink(this.focusedWikiElement().find('a').first().data('id'));
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