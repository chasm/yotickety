'use strict';

angular.module('Tickety.controllers', [])
  .controller('GameCtrl', [ '$scope', 'fb', function($scope, fb) {
    $scope.newGame = function() {
      var promise = fb.link($scope, Math.floor(Math.random() * 1000000));
      // promise.then(function() {
      //   console.log($scope.games);
      //   window.games = $scope.games;
      // });
    };
  }])
  .controller('BoardCtrl', function ($scope) {
    var _ = window._;
    
    var X_WIN_PATTERNS = [
      'xxx......',
      '...xxx...',
      '......xxx',
      'x..x..x..',
      '.x..x..x.',
      '..x..x..x',
      'x...x...x',
      '..x.x.x..'
    ];
    
    var O_WIN_PATTERNS = _.map(X_WIN_PATTERNS, function(str) {
      return str.replace(/x/g,'o');
    });
    
    var POSSIBLE_X_WIN_PATTERNS = [
      ' xx......', 'x x......', 'xx ......',
      '.. xx...', '...x x...', '...xx ...',
      '...... xx', '......x x', '......xx ',
      ' ..x..x..', 'x.. ..x..', 'x..x.. ..',
      '. ..x..x.', '.x.. ..x.', '.x..x.. .',
      '.. ..x..x', '..x.. ..x', '..x..x.. ',
      ' ...x...x', 'x... ...x', 'x...x... ',
      '.. .x.x..', '..x. .x..', '..x.x. ..'
    ];
    
    var POSSIBLE_O_WIN_PATTERNS = _.map(POSSIBLE_X_WIN_PATTERNS, function(str) {
      return str.replace(/x/g,'o');
    });
    
    var X_WIN_REGEXP = new RegExp(X_WIN_PATTERNS.join('|'), 'i');
      
    var O_WIN_REGEXP = new RegExp(O_WIN_PATTERNS.join('|'), 'i');
    
    $scope.makeMove = function(square) {
      console.log('Making a move in square ' + square);
      var mark = ($scope.gameboards.length % 2 === 1) ? 'x' : 'o';
      $scope.addMark(square, mark);
      
      if ($scope.testForWin()) {
        window.alert(mark.toUpperCase() + ' won!');
      } else if ($scope.testForScrewed()) {
        window.alert(mark.toUpperCase() + ' has you now!');
      }
      
      $scope.setBoard();
    };
    
    $scope.setBoard = function() {
      var board = $scope.gameboards[$scope.gameboards.length - 1];
      var len = board.length;
      $scope.squares = $scope.squares || [];
      board = board.split('');
      for (var i = 0; i < len; i++) {
        $scope.squares[i] = board[i];
      }
    };
    
    $scope.testForWin = function() {
      var len = $scope.gameboards.length;
      var board = $scope.gameboards[len - 1];
      var mark, regex, patterns;
      
      if (len % 2 === 0) {
        mark = 'X';
        regex = X_WIN_REGEXP;
        patterns = X_WIN_PATTERNS;
      } else {
        mark = 'O';
        regex = O_WIN_REGEXP;
        patterns = O_WIN_PATTERNS;
      }
      
      if (regex.test(board)) {
        _.each(patterns, function(pattern) {
          var re = new RegExp(pattern, 'i');
          if (re.test(board)) {
            _.each(pattern.split(''), function(chr, idx) {
              if (chr !== '.') {
                board = $scope.replaceChar(board, idx, mark);
              }
            });
            $scope.gameboards[len - 1] = board;
          }
        });
        
        return true;
      }
      
      return false;
    };
    
    $scope.testForScrewed = function() {
      var _ = window._;
      var len = $scope.gameboards.length;
      var board = $scope.gameboards[len - 1];
      var cpMark = (len % 2 === 1) ? 'x' : 'o';
      var npMark = (cpMark === 'x') ? 'o' : 'x';
      var cpPatterns = (cpMark === 'x') ? POSSIBLE_X_WIN_PATTERNS : POSSIBLE_O_WIN_PATTERNS;
      var npPatterns = (cpMark === 'x') ? POSSIBLE_O_WIN_PATTERNS : POSSIBLE_X_WIN_PATTERNS;
      var cpPossibleWins, npPossibleWins, re;
      
      cpPossibleWins = _.reduce(cpPatterns, function(memo, pattern) {
        re = new RegExp(pattern, 'i');
        if (re.test(board)) {
          console.log(board);
          console.log('Possible win for ' + cpMark + ': ' + pattern);
        }
        return memo + (re.test(board) ? 1 : 0);
      }, 0);
      
      npPossibleWins = _.reduce(npPatterns, function(memo, pattern) {
        re = new RegExp(pattern, 'i');
        if (re.test(board)) {
          console.log(board);
          console.log('Possible win for ' + npMark + ': ' + pattern);
        }
        return memo + (re.test(board) ? 1 : 0);
      }, 0);
      
      console.log(cpPossibleWins + ' possible wins for current player, ' + cpMark.toUpperCase());
      console.log(npPossibleWins + ' possible wins for next player, ' + npMark.toUpperCase());
    };
  });