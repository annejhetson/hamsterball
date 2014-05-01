Hamsterball = Ember.Application.create({
  LOG_TRANSITIONS: true
 });

Hamsterball.ApplicationSerializer = DS.LSSerializer.extend();
Hamsterball.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'hamsterball_data'
});


// ------ROUTER-----------------------
Hamsterball.Router.map(function() {
  this.resource('teams', { path: '/' }, function() {
    this.resource('newteam', { path: 'teams/new' });
    this.resource('team', { path: '/team/:id/:name' }, function() {
      this.resource('newplayer', { path: 'players/new' });
      this.resource('player', { path: 'player/:player_id' }, function() {
        this.resource('newstat', { path: 'stats/new' });
      });
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
    this.render({ outlet: 'newteam' });
  }
});

Hamsterball.PlayerRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'player' });
  },
  model: function(params) {

    var player = this.store.find('player', params.player_id);
    return player;

  }
});

Hamsterball.NewplayerRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'newplayer' });

  }
});

Hamsterball.NewstatRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'newstat' });
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
          playername : name
      });
      player.save();
      var team = this.get('team').get('model');
      team.get('players').pushObject(player)
      team.save();

      this.transitionToRoute('team', team);
    }
  }
});

Hamsterball.NewstatController = Ember.ObjectController.extend({
  needs: "player",
  player: Ember.computed.alias("controllers.player"),
  actions :{
    shotMade : function(){
      var shot = true;
      var store = this.get('store');
      var stat = store.createRecord('stat',{
          shot : shot
      });

      stat.save();
      var player = this.get('player').get('model');
      player.get('stats').pushObject(stat)
      player.save();

      this.transitionToRoute('newstat');
    },
    shotMissed : function(){
      var shot = false;
      var store = this.get('store');
      var stat = store.createRecord('stat',{
          shot : shot
      });

      stat.save();
      var player = this.get('player').get('model');
      player.get('stats').pushObject(stat)
      player.save();

      this.transitionToRoute('newstat');
    }
  }
});

