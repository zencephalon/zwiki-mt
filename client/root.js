Template.root.helpers({
  root: function() {
    console.log(Wiki.findOne({p: '/'}));
    return Wiki.findOne({p: '/'});
  }
});

Template.root.rendered = function() {
  setInterval(function() {
    $('.wiki div.c').each(function(index, ele) {
      console.log(ele);
      var cs = $(ele).contents().filter(function() {
        return !$(this).hasClass('wiki');
      });
      cs = $.map(cs, function(node) {return (node.nodeType == 3) ? node.data : node.outerHTML}).join("");
      console.log(cs);
    })
  }, 3333);
}