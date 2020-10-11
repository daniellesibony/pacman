'use strict'
const WALL = '🌴'
const FOOD = '✨'
const EMPTY = ' ';
const SUPERFOOD= '💕'

// a game-over modal with a play again button should be displayed.

var gBoard;
var gGame;

function init() {
    console.log('hello')
    gGame = {
        score: 0,
        isOn: true
    };
    document.querySelector('h2 span').innerText = gGame.score
    gGhosts = [];
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    hideModal()
    // checkVictory()
    hideVictoryModal()
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 8 ||
                i === 8 && j === 1 || i === 1 && j === 1 || i === 8 && j === 8) {
                board[i][j] = SUPERFOOD;
            }
        }
    }
    return board;
}

function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < mat[0].length; j++) {
        var cell = mat[i][j];
        var className = 'cell cell' + i + '-' + j;
        strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    showModal()
}


function showModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block';
}

function hideModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none';
}

function victoryModal() {
    var elModal = document.querySelector('.victory-modal')
    elModal.style.display = 'block';
    // elModal.style.display = (elModal.style.display === 'none') ? 'block' : 'none';
}

function hideVictoryModal() {
    var elModal = document.querySelector('.victory-modal')
    elModal.style.display = 'none';
}


function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i]
        for (var j = 0; j < row.length; j++) {
            if (gBoard[i][j] === FOOD) {
                return false
            }
        }
    }
    console.log('you WON BITCH')
    return true
}