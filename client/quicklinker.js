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
          var $linker_text_input = $('#linker-text-input');
          $('#linker-id-input').val(doc._id);
          if ($linker_text_input.val() == '') {
            $linker_text_input.val(doc.title);
          }
        }
      }]
    }
  }
});

Template.quicklinker.rendered = function() {
  var selection;

  Mousetrap.bind('ctrl+l', function(e) {
    e.preventDefault();
    var $quicklinker = $('#quicklinker');
    if ($quicklinker.is(':hidden')) {
      selection = rangy.saveSelection();
      $('#linker-text-input').val(rangy.getSelection().toString());

      $quicklinker.show();
      $('#linker-input').focus().val(":");
    } else {
      $quicklinker.hide();
      rangy.restoreSelection(selection);
    }

  });

  $(document).ready(function() {
    $('#linker-form').submit(function(e) {
      e.preventDefault();
      $('#quicklinker').hide();
      rangy.restoreSelection(selection);

      var link_text = $('#linker-text-input').val();
      var link_id = $('#linker-id-input').val();
      var link = Wiki.makeLink(link_id);

      if (selection.toString() != "") {
        rangy.getSelection().deleteFromDocument();
      }

      document.execCommand("InsertHTML", false, "<a href='" + link + "'>" + link_text + "</a> ");
    })
  })
}