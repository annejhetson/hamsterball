Hamsterball.Player = DS.Model.extend({
  playername: DS.attr('string'),
  team: DS.belongsTo('team', {async: true}),
  stats: DS.hasMany('stat', {async: true})
});
