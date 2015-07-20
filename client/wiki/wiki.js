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

  Mousetrap.bind('enter', function(e) {
    if ($(e.target).hasClass('content')) {
      e.preventDefault();
      document.execCommand('insertHTML', false, '<br><br>');
    }
  })

  Mousetrap.bind('ctrl+n', function(e) {
    e.preventDefault();
    var sel = rangy.getSelection();
    var sel_str = sel.toString();

    if (sel_str != "") {
      var wiki = Wiki.create({uid: Meteor.userId()});
      Meteor.subscribe("wiki", wiki._id);

      sel.deleteFromDocument();
      var link = Link.create({target: wiki._id, label: sel_str});

      document.execCommand("InsertHTML", false, link.html);

      WikiView.focusLink(link._id);
      WikiView.openFocusedLink();
      WikiView.focusFocusedLinkWiki();
    }
  });

  var saveFunction = _.debounce(WikiView.saveFunction, 300);

  $('.wiki').keypress(saveFunction);
}

Template.wiki.events({

});