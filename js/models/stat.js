Hamsterball.Stat = DS.Model.extend({
  shot: DS.attr('boolean'),
  player: DS.belongsTo('player', {async: true})
});
