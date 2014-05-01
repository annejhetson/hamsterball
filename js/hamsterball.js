Hamsterball = Ember.Application.create({
  LOG_TRANSITIONS: true//,
  // LOG_TRANSITIONS_INTERNAL: true
});

Hamsterball.ApplicationSerializer = DS.LSSerializer.extend();
Hamsterball.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'hamsterball_data'
});


// ------ROUTER-----------------------
Hamsterball.Router.map(function() {
  this.resource('teams', { path: '/' }, function() {
    this.resource('newteam', { path: 'teams/new' });
    this.resource('team', { path: '/team/:id' }, function() {
      this.resource('newplayer', { path: 'players/new' });
    });
  });
});


// --------ROUTES---------------------
Hamsterball.TeamsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'main' });
  },
  model: function() {
    var teams = this.store.find('team');
    return teams;
  }
});

Hamsterball.TeamRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'team' });
  },
  model: function(params) {
    var team = this.store.find('team', params.id);
    return team;
  }
});

Hamsterball.NewteamRoute = Ember.Route.extend({
  renderTemplate: function() {
  console.log(this);
    this.render({ outlet: 'newteam' });
  }
});

Hamsterball.PlayersRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'players' });
  },
  model: function() {
    var players = this.store.find('player');
    return players;
  }
});

Hamsterball.NewplayerRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'newplayer' });
  }
});

//---------CONTROLLER-------------------
Hamsterball.NewteamController = Ember.ObjectController.extend({
  actions: {
    save: function(){
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

Hamsterball.NewplayerController = Ember.ObjectController.extend({
  needs: "team",
  team: Ember.computed.alias("controllers.team"),
  actions :{
    savePlayer : function(){
      var name = $('#name').val();
      var store = this.get('store');
      var player = store.createRecord('player',{
          name : name
      });
      player.save();
      var team = this.get('team').get('model');
      team.get('players').pushObject(player)
      team.save();

      this.transitionToRoute('team', team);
    }
  }
});
// {"team":{"records":{"ssbls":{"id":"ssbls","name":"teletubbie"}}},
// "player":{"records":{"0v72l":{"id":"0v72l","name":"Tinky Winky","team":"ssbls"}}}}

