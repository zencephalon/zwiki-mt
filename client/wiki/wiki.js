Template.wiki.helpers({

});

Template.wiki.rendered = function() {
  var self = Template.instance();
  self.$('div.content[data-id=' + this.data._id + ']').html(this.data.text);
  self.$('h2[data-id=' + this.data._id + ']').html(this.data.title);

  var saveFunction = function() {
    $('.wiki').each(function(index, ele) {
      var $ele = $(ele);
      var $content = $(ele).children('.content');
      var $title = $(ele).children('.title');

      var content = $content.html();

      var child_content = $.map($content.children('.wiki'), function(ele) {return ele.outerHTML});

      child_content.forEach(function(c) {
        content = content.replace(c, "");
      })

      content = content.replace(/\ open-link="true"/g, "");
      content = content.replace(/\ open-link/g, "");

      var t = $title.text();
      var wiki = Wiki.findOne($ele.data('id'));
      wiki.save({title: t, text: content});
    })
  };
  saveFunction = _.debounce(saveFunction, 300);

  $('.wiki').keypress(saveFunction);
}

Template.wiki.events({
  'click a': function(e) {
    var target = $(e.target);
    var href = target.attr('href');

    if (href = href.match(/^\/w\/(.*)/)) {
      href = href[1];

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