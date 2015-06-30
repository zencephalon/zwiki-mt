function dropData() {
  Wikis.remove({});
  Meteor.users.remove({});
}

function seedData() {
  var uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  var luvism = Wiki.create({title: "Luvism", text: "I luv Luvism", uid: uid});
  var guiding_principles = Wiki.create({title: "Guiding Principles", text: "I follow four guiding principles", uid: uid});
  var index = Wiki.create({title: "Zencephalon", text: "I follow <a href='" + Wiki.makeLink(luvism._id) + "'>luvism</a> and my <a href='" + Wiki.makeLink(guiding_principles._id) + "'>guiding principles</a>.", root: true, uid: uid});
}

if (Meteor.isServer) {
  // dropData();
  Meteor.startup(function() {
    if (Wikis.find().count() == 0) {
      seedData();
    }

    Wikis._ensureIndex({
      "text": "text"
    });

    Wiki.subscriptions();
  })

  Meteor.methods({
    totalWordCount: function() {
      return Wikis.aggregate([
        {$project: {count: 1}},
        {$group: {_id: null, count: {$sum: "$count"}}}
      ])[0]['count'];
    }
  })
}