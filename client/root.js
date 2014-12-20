Template.root.helpers({
  root: function() {
    return Wiki.findOne({p: '/'});
  }
})