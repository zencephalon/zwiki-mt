// Cycle link
Mousetrap.bind('alt+right', function(e) {
  e.preventDefault();
  WikiView.focusNextLink();
});

// Open link
Mousetrap.bind('alt+down', function(e) {
  e.preventDefault();
  WikiView.toggleFocusedLink();
});