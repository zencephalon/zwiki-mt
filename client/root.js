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

      var cs = $ele.children('div.c').contents().filter(function() {
        return !$(this).hasClass('wiki');
      });

      cs = $.map(cs, function(node) {return (node.nodeType == 3) ? node.data : node.outerHTML}).join("");

      var wiki = Wiki.findOne($ele.data('id'));
      console.log(wiki);
    })
  }, 3333);
}