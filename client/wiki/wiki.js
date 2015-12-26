Template.wiki.helpers({
  focused: function(wiki) {
    return WikiView.isFocused(wiki);
  },
  focusedClass: function(wiki) {
    return WikiView.isFocused(wiki) ? "focused" : "";
  },
  editable: function(wiki) {
    return Meteor.userId() && WikiView.isFocused(wiki);
  }
});

Template.wiki.rendered = function() {
  var self = Template.instance();
  var oldWikiId = undefined;
  var id = Template.currentData()._id;

  if (! WikiView.focusedId()) {
    WikiView.focus(id);
  }

  this.autorun(function() {
    id = Template.currentData()._id;
    if (id != oldWikiId) {
      var wiki = Wiki.findOne({_id: id});
      wiki.subscribeToLinked();

      self.$('div.content[data-id=' + wiki._id + ']').html(wiki.text);
      self.$('h2[data-id=' + wiki._id + ']').html(wiki.title);
      oldWikiId = id;
    }
  })

  self.$('.wiki').click(function(e) {
    var $target = $(e.target);
    if ($target.is('a')) { return; }
    var dataId = $target.data('id');
    if (dataId) {
      WikiView.focus(dataId);
    }
  });

  var saveDebounced = _.debounce(WikiView.save, 300);

  self.$('.wiki').keypress(saveDebounced);
}

Template.wiki.events({

});