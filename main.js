// CONSTANTS
var NO_PLAYER = -1;
var PLAYER_1 = 0;
var PLAYER_2 = 1;
var WINNING_SETS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// LOGIC
var game = {
  winner: NO_PLAYER,
  board: [
    NO_PLAYER, NO_PLAYER, NO_PLAYER,
    NO_PLAYER, NO_PLAYER, NO_PLAYER,
    NO_PLAYER, NO_PLAYER, NO_PLAYER
  ],
  currentPlayerId: PLAYER_1,
  play: function(playerId, cellId) {
    if (game.board[cellId] === NO_PLAYER & !game.hasWinner()) {
      game.board[cellId] = playerId;
      ui.assignCellToPlayer(cellId, playerId);
      var set = game.winningSet();
      if (set) {
        game.winner = playerId
        ui.setGameOver(playerId)
      }
      else if (!game.hasEmptyCells()) {
        ui.setDraw()
      }
      else {
        game.nextTurn()
      }
    }
  },
  nextTurn: function() {
    game.currentPlayerId = game.currentPlayerId === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    ui.setTurn(game.currentPlayerId);
  },
  hasEmptyCells: function() {
    for (var i = game.board.length - 1; i >= 0; i--) {
      if (game.board[i] === NO_PLAYER) { return true }
    }
    return false;
  },
  winningSet: function() {
    var set = null;
    for (var i = WINNING_SETS.length - 1; i >= 0; i--) {
      set = WINNING_SETS[i];
      if (game.board[set[0]] !== NO_PLAYER 
        && game.board[set[0]] === game.board[set[1]] 
        && game.board[set[1]] === game.board[set[2]]) {
        return set;
      }
    }
  },
  hasWinner: function() {
    return game.winner !== NO_PLAYER;
  }
}

// VIEW
var ui = {
  board: function() { 
    return $('.tictactoe-board') 
  },
  cellForId: function(cellId) {
    return ui.board().children().eq(cellId)
  },
  assignCellToPlayer: function(cellId, playerId) {
    ui.cellForId(cellId).addClass(ui.playerLabelForId(playerId))
  },
  playerLabelForId: function(playerId) {
    return (playerId === PLAYER_1) ? 'x' : 'o';
  },
  setGameOver: function(playerId) {
    $('.tictactoe-turn').text("Player " + ui.playerLabelForId(playerId) + " wins!")
  },
  setDraw: function() {
    $('.tictactoe-turn').text("Draw!")
  },
  setTurn: function(playerId) {
    $('.tictactoe-turn-label').text(ui.playerLabelForId(playerId))
  }
}

// INIT
$(document).ready(function() {
  $('.tictactoe-cell').click(function(event) {
    game.play(game.currentPlayerId, $(this).index());
  });
});