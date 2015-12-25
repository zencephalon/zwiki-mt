// Override annoyingly broken default contentEditable behavior
Mousetrap.bind('enter', function(e) {
  if ($(e.target).hasClass('content')) {
    e.preventDefault();
    document.execCommand('insertHTML', false, '<br><br>');
  }
})

// Cycle link
Mousetrap.bind('alt+right', function(e) {
  e.preventDefault();
  WikiView.focusNextLink();
});

Mousetrap.bind('alt+left', function(e) {
  e.preventDefault();
  WikiView.focusPrevLink();
});

Mousetrap.bind('alt+down', function(e) {
  e.preventDefault();
  WikiView.openFocusedLink();
  WikiView.focusFocusedLinkWiki();
  WikiView.focusFirstLink();
});

Mousetrap.bind('alt+up', function(e) {
  e.preventDefault();
  WikiView.focusParentWiki();
});

Mousetrap.bind('tab', function(e) {
  e.preventDefault();
  var $child_content = WikiView.focusedWikiElement().children('.content');
  $child_content.focus();
  var range = rangy.createRange();
  range.setStart($child_content[0]);
  rangy.getSelection().setSingleRange(range);
});

// Open link
Mousetrap.bind('alt+space', function(e) {
  e.preventDefault();
  WikiView.toggleFocusedLink();
});

// Create new wiki and link from selection
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

    WikiView.save();
    WikiView.focusLink(link._id);
    WikiView.openFocusedLink();
    WikiView.focusFocusedLinkWiki();
  }
});