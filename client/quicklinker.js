Template.quicklinker.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [{
        token: ':',
        replacement: '',
        end_token: '',
        collection: Wikis,
        field: "slug",
        template: Template.link_preview
      }]
    }
  }
});

Template.quicklinker.rendered = function() {
  var selection;
  Mousetrap.bind('ctrl+space', function(e) {
    e.preventDefault();
    selection = rangy.saveSelection();
    $('#quicklinker').show();

    $('#linker-input').focus().val(":");
    return false;
  });
  $(document).ready(function() {
    $('#linker-form').submit(function(e) {
      console.log("hello");
      e.preventDefault();
      $('#quicklinker').hide();
      rangy.restoreSelection(selection);
      // var 
      document.execCommand("InsertHTML", false, "");
    })
  })
}