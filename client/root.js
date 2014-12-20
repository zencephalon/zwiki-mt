Template.root.helpers({
  root: function() {
    console.log(Wiki.findOne({p: '/'}));
    return Wiki.findOne({p: '/'});
  }
});

Template.root.rendered = function() {
  setInterval(function() {
    $('.wiki').each(function(index, ele) {
      var $ele = $(ele);

      var cs = $.map($ele.children('.c'), function(c) {
        return $(c).contents().filter(function() {
          return !$(this).hasClass('wiki');
        });
      });

      cs = $.map(cs, function(c) {
        return $.map(c, function(node) {return (node.nodeType == 3) ? node.data : node.outerHTML}).join("")
      }).join("<br>");

      console.log(cs);

      var t = $ele.children('.t').text();
      var wiki = Wiki.findOne($ele.data('id'));
      wiki.update({t: t, c: cs});
    })
  }, 3333);
}