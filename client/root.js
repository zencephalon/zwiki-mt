Template.root.helpers({
  root: function() {
    console.log(Wiki.findOne({p: '/'}));
    return Wiki.findOne({p: '/'});
  }
})