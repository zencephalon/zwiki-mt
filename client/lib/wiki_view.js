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
  focusFirstLink: function() {
    this.focusLink(this.focusedWikiElement().find('a').first().data('id'));
  },
  focusLastLink: function() {
    this.focusLink(this.focusedWikiElement().find('a').last().data('id'));
  },
  focusNextLink: function() {
    var $focusedLink = this.focusedLinkElement();
    if ($focusedLink) {
      var $next = $focusedLink.nextAll('a').first();
      if ($next.length > 0) {
        this.focusLink($next.data('id'));
        return;
      }
    }
    this.focusFirstLink();
  },
  focusPrevLink: function() {
    var $focusedLink = this.focusedLinkElement();
    if ($focusedLink) {
      var $next = $focusedLink.prevAll('a').first();
      if ($next.length > 0) {
        this.focusLink($next.data('id'));
        return;
      }
    }
    this.focusLastLink();
  },
  toggleFocusedLink: function() {
    var $link = this.focusedLinkElement();
    var href = $link.attr('href');

    if (href = href.match(/^\/w\/(.*)/)) {
      href = href[1];

      var wiki = Wiki.findOne({_id: href});
      var selector = "[data-id='" + wiki._id + "']";
      var subview_node = $link.parent().children(selector);
      var wiki_node = $(selector);

      if (subview_node.length === 0) {
        if (wiki_node.length === 0) {
          $link.attr('open-link', 'true');
          UI.renderWithData(Template.wiki, wiki, $link[0].parentNode, $link[0].nextSibling);
        } else {
          wiki_node.focus();
        }
      } else {
        $link.attr('open-link', '');
        subview_node.remove();
      }
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