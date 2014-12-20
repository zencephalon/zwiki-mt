Template.root.helpers({
  root: function() {
    console.log(Wiki.findOne({p: '/'}));
    return Wiki.findOne({p: '/'});
  }
});

Template.root.rendered = function() {
  setInterval(function() {
    var cs = $('.wiki div.c').contents().filter(function() {
      return !$(this).hasClass('wiki');
    });
    cs = $.map(cs, function(node) {return (node.nodeType == 3) ? node.data : node.outerHTML}).join("");
    console.log(cs);
  }, 3333);
}