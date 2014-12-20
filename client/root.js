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

      var c = $ele.children('.c').contents().filter(function() {
        return !$(this).hasClass('wiki');
      });

      c = $.map(c, function(node) {return (node.nodeType == 3) ? node.data : node.outerHTML}).join("");

      var t = $ele.children('.t').text();
      var wiki = Wiki.findOne($ele.data('id'));
      wiki.update({t: t, c: c});
    })
  }, 3333);
}