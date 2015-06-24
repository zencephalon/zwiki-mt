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
        template: Template.link_preview,
        callback: function(doc, element) {
          $('#linker-id-input').val(doc._id);
          $('#linker-text-input').val(doc.title);
        }
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
      var link_text = $('#linker-text-input').val();
      var link_id = $('#linker-id-input').val();
      var link = Wiki.makeLink(link_id);
      document.execCommand("InsertHTML", false, "<a href='" + link + "'>" + link_text + "</a>");
    })
  })
}