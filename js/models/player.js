Hamsterball.Player = DS.Model.extend({
  name: DS.attr('string'),
  team: DS.belongsTo('team', {async: true})
});
