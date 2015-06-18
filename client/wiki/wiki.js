Template.wiki.helpers({

});

Template.wiki.rendered = function() {
  $('div[data-id=' + this.data._id + ']').html(this.data.c);
}

Template.wiki.events({
  'click a': function(e) {
    var target = $(e.target);
    var href = target.attr('href');
    console.log("Got click!")

    if (href.substr(0, 4) !== 'http') {
      e.preventDefault();
      console.log("Default prevented!")

      var wiki = Wiki.findOne({_id: href});
      var subview_node = $("[data-id='" + wiki._id + "']");

      if (subview_node.length === 0) {
        target.attr('open-link', 'true');
        UI.renderWithData(Template.wiki, wiki, e.target.parentNode, e.target.nextSibling);
      } else {
        target.attr('open-link', '');
        subview_node.remove();
      }
    }
  }
});