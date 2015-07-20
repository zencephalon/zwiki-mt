function dropData() {
  Wikis.remove({});
  Meteor.users.remove({});
}

function seedData() {
  var uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  var luvism = Wiki.create({title: "Luvism", text: "I luv Luvism", uid: uid});
  var guiding_principles = Wiki.create({title: "Guiding Principles", text: "I follow four guiding principles", uid: uid});
  var bunday = Wiki.create({title: "Bunday", text: "Call me Bunday. " + Link.create({target: luvism._id, label: "ILUVU."}).html + " I practice my " + Link.create({target: guiding_principles._id, label: "principles"}).html});
  var index = Wiki.create({title: "Zencephalon", text: "Call me " + Link.create({target: bunday._id, label: "Bunday."}).html + " I follow " + Link.create({target: luvism._id, label: "luvism"}).html + " and my " + Link.create({target: guiding_principles._id, label: "guiding principles"}).html, root: true, uid: uid});
}

function minimalSeed() {
  var uid = Accounts.createUser({email: "mkbunday@gmail.com", password: "zen"});
  var index = Wiki.create({title: "Zencephalon", text: "ILUVU", root: true, uid: uid});
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