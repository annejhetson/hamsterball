Hamsterball = Ember.Application.create({
  LOG_TRANSITIONS: true
  //LOG_TRANSITIONS_INTERNAL: true
});

Hamsterball.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'hamsterball_data'
});


// ------ROUTER-----------------------
Hamsterball.Router.map(function() {
  this.resource('teams', { path: '/' }, function() {
    this.resource('newteam', { path: 'team/new' });
  });
});

// --------ROUTES---------------------
Hamsterball.TeamsRoute = Ember.Route.extend({
  model: function() {
    var teams = this.get('store').findAll('team');
    return teams;
  }
});

//---------CONTROLLER-------------------
Hamsterball.NewteamController = Ember.ObjectController.extend({
  actions :{
    save : function(){
      var name = $('#name').val();
      var store = this.get('store');
      var team = store.createRecord('team',{
          name : name
      });
      team.save();
      this.transitionToRoute('teams');
    }
  }
});



// {"team":
//   {"records":
//     {"i39ar":{"id":"i39ar","name":"carebares"},
//      "bslbu":{"id":"bslbu","name":"LittlePonies"},
//      "rl5pt":{"id":"rl5pt","name":"teletubbies"}
//    }
//   }
// }
