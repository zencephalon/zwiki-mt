Template.quickswitcher.helpers({
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
          Router.go(Wiki.makeLink(doc._id));
        }
      }]
    }
  }
});

Template.quickswitcher.events({    
  'submit form': function(event) {     
    event.preventDefault();    
  }    
});

Template.quickswitcher.rendered = function() {
  Mousetrap.bind('ctrl+space', function(e) { 
    e.preventDefault();
    $('#quickswitcher').show();

    // Save the viewport
    // View.save(e.target);

    $('#switcher').focus().val(":");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return false;
  });
  $(document).ready(function() {
    $('#quickswitcher').focusout(function() {
      $('#quickswitcher').hide();
      // Restore the viewport
      // View.restore_delayed();
    })
  });
}