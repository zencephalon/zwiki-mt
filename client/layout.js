Template.layout.helpers({
});

Template.layout.rendered = function() {
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

      console.log(content);

      var t = $title.text();
      var wiki = Wiki.findOne($ele.data('id'));
      wiki.save({title: t, text: content});
    })
  };
  saveFunction = _.debounce(saveFunction, 150);

  $('.wiki').keypress(saveFunction);
}