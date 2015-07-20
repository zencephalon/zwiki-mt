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