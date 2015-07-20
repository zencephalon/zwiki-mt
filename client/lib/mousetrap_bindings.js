// Cycle link
Mousetrap.bind('alt+right', function(e) {
  e.preventDefault();
  WikiView.focusNextLink();
});

Mousetrap.bind('alt+left', function(e) {
  e.preventDefault();
  WikiView.focusPrevLink();
})

Mousetrap.bind('alt+down', function(e) {
  e.preventDefault();
  WikiView.openFocusedLink();
  WikiView.focusFocusedLinkWiki();
  WikiView.focusFirstLink();
});

Mousetrap.bind('alt+up', function(e) {
  e.preventDefault();
  WikiView.focusParentWiki();
})

// Open link
Mousetrap.bind('alt+space', function(e) {
  e.preventDefault();
  WikiView.toggleFocusedLink();
});