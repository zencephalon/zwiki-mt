Template.layout.helpers({
});

Template.layout.rendered = function() {
  console.log(this);
  // setInterval(function() {
  //   $('.wiki').each(function(index, ele) {
  //     var $ele = $(ele);

  //     var content = $ele.html();

  //     var child_content = $.map($ele.children('.wiki'), function(ele) {return ele.outerHTML});

  //     child_content.forEach(function(c) {
  //       content = content.replace(c, "");
  //     })

  //     content = content.replace(/\ open-link="true"/g, "");
  //     content = content.replace(/\ open-link/g, "");

  //     console.log(content);

  //     // var t = $ele.children('.t').text();
  //     // var wiki = Wiki.findOne($ele.data('id'));
  //     // wiki.update({t: t, c: cs});
  //   })
  // }, 3333);
}