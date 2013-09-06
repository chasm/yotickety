'use strict';

angular.module('Tickety.services', [])
  .service('fb', [ 'angularFire', function(angularFire) {
    return {
      link: function(scope, playerId) {
        var ref = new Firebase('https://tickety.firebaseio.com/queue');
        ref.transaction(function(currentData) {
          if (currentData === null) {
            var game = ref.parent().child('games').push({
              player1: playerId
            })
            return game.name();
          } else {
            ref.parent().child('games').child(currentData).child('player2').set(playerId);
            return null;
          }
        });
        // return angularFire(ref, scope, 'games', {});
      }
    }
  }]);
