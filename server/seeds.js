function dropData() {
  Wikis.remove({});
  Meteor.users.remove({});
}

function seedData() {
  var uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  var luvism = Wiki.create({c: "I luv Luvism", t: "Luvism", p: "/luvism", uid: uid});
  var guiding_principles = Wiki.create({c: "I follow four guiding principles", t: "Guiding Principles", p: "/guiding_principles", uid: uid});
  var index = Wiki.create({c: "I follow <a href='/luvism'>luvism</a> and my <a href='/guiding_principles'>guiding principles</a>.", t: "Zencephalon", p: '/', uid: uid});
}

if (Meteor.isServer) {
  dropData();
  Meteor.startup(function() {
    if (Wikis.find().count() == 0) {
      seedData();
    }

    Meteor.publish("wikis", function() {
      return Wikis.find({});
    })
  })
}