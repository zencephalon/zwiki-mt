// Cycle link
Mousetrap.bind('alt+right', function(e) {
  e.preventDefault();
  WikiView.focusNextLink();
});

Mousetrap.bind('alt+left', function(e) {
  e.preventDefault();
  WikiView.focusPrevLink();
})

// Open link
Mousetrap.bind('alt+down', function(e) {
  e.preventDefault();
  WikiView.toggleFocusedLink();
});