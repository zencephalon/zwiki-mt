Template.wiki.helpers({
  focused: function(wiki) {
    return wiki._id === WikiView.focusedId();
  },
  focusedClass: function(wiki) {
    return wiki._id === WikiView.focusedId() ? "focused" : "";
  }
});

Template.wiki.rendered = function() {
  var self = Template.instance();
  var oldWikiId = undefined;

  if (! WikiView.focusedId()) {
    WikiView.focus(Template.currentData()._id);
  }

  this.autorun(function() {
    if (Template.currentData()._id != oldWikiId) {
      var wiki = Wiki.findOne({_id: Template.currentData()._id});
      wiki.subscribeToLinked();

      self.$('div.content[data-id=' + wiki._id + ']').html(wiki.text);
      self.$('h2[data-id=' + wiki._id + ']').html(wiki.title);
      oldWikiId = Template.currentData()._id;
    }
  })

  var saveDebounced = _.debounce(WikiView.save, 300);

  $('.wiki').keypress(saveDebounced);
}

Template.wiki.events({

});