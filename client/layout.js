Template.layout.helpers({
  totalWordCount: function() {
    return Session.get("totalWordCount");
  }
});

Template.layout.rendered = function() {
  $('body').flowtype({
    minimum: 0,
    maximum: 1600,
    minFont: 12,
    maxFont: 42,
    fontRatio: 40,
    lineRatio: 1.45
  });
}

Template.layout.events({
  'click a': function(e) {
    var target = $(e.target);
    var href = target.attr('href');

    if (href = href.match(/^\/w\/(.*)/)) {
      href = href[1];

      e.preventDefault();

      var wiki = Wiki.findOne({_id: href});
      var selector = "[data-id='" + wiki._id + "']";
      var subview_node = target.parent().children(selector);
      var wiki_node = $(selector);

      if (subview_node.length === 0) {
        if (wiki_node.length === 0) {
          target.attr('open-link', 'true');
          UI.renderWithData(Template.wiki, wiki, e.target.parentNode, e.target.nextSibling);
        } else {
          wiki_node.focus();
        }
      } else {
        target.attr('open-link', '');
        subview_node.remove();
      }
    }
  }
})