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
    var link_id = $(e.target).data('id')

    if (link_id) {
      e.preventDefault();
      WikiView.focusLink(link_id);
      WikiView.toggleFocusedLink();
    }
  }
})