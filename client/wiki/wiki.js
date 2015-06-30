Template.wiki.helpers({
});

Template.wiki.rendered = function() {
  var self = Template.instance();
  var oldWikiId = undefined;

  this.autorun(function() {
    if (Template.currentData()._id != oldWikiId) {
      var wiki = Wiki.findOne({_id: Template.currentData()._id});
      self.$('div.content[data-id=' + wiki._id + ']').html(wiki.text);
      self.$('h2[data-id=' + wiki._id + ']').html(wiki.title);
      oldWikiId = Template.currentData()._id;
    }
  })

  Mousetrap.bind('ctrl+n', function(e) {
    e.preventDefault();
    var sel = rangy.getSelection();
    var sel_str = sel.toString();

    if (sel_str != "") {
      var wiki = Wiki.create({uid: Meteor.userId()});

      sel.deleteFromDocument();

      var link = Wiki.makeLink(wiki._id);

      document.execCommand("InsertHTML", false, '<a href="' + link + '" open-link="true">' + sel_str + '</a>');

      UI.renderWithData(Template.wiki, wiki, e.target.parentNode, e.target.nextSibling);
    }
  });

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

});