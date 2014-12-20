Template.wiki.helpers({

});

Template.wiki.rendered = function() {
  setTimeout(function() {
    console.log(this);
    $('div[data-id=' + this.data._id + '] div.c').html(this.data.c);
  }.bind(this), 500);
}

Template.wiki.events({
  'click a': function(e) {
    var target = $(e.target);
    var href = target.attr('href');
    console.log("Got click!")

    if (href.substr(0, 4) !== 'http') {
      e.preventDefault();
      console.log("Default prevented!")

      var wiki = Wiki.findOne({p: href});
      var subview_node = $("[data-id='" + wiki._id + "']");

      if (subview_node.length === 0) {
        target.attr('class', 'open-link');
        UI.renderWithData(Template.wiki, wiki, e.target.parentNode, e.target.nextSibling);
      } else {
        target.attr('class', '');
        subview_node.remove();
      }
    }
  }
});