Template.html_edit.rendered = function() {
  $("#html_text").autosize();
  var id = Template.currentData()._id

  $("#html_save").click(function(e) {
    e.preventDefault();
    var wiki = Wiki.findOne(id);
    wiki.save({title: $("#html_title").val(), text: $("#html_text").val()});
    Router.go(Wiki.makeLink(id));
  })
}