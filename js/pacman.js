'use strict'
const PACMAN = '🧚‍♂️';

var gGhostEaten;



function getGhostIdx(nextLocation) {
    var idx;
    for(var i =0; i <gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if(currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
            idx = i;
        }
       
    }
    return idx;

}
var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    else if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true
        setTimeout(function () {
            gPacman.isSuper = false;
            if(gGhostEaten > 0) {
                createGhosts(gBoard, gGhostEaten)
                gGhostEaten = 0;

            }
           
        }, 5000)
    }
    else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        } else {
            var ghostIdx = getGhostIdx(nextLocation);
            gGhosts.splice(ghostIdx,1);
            gGhostEaten++;
        }

    }

if ((gPacman.isSuper === true) && (nextCell === GHOST)) {
    updateScore(1)
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
if (checkVictory()) {
    victoryModal()
}

// update the model
gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

// update the dom
renderCell(gPacman.location, EMPTY);

gPacman.location = nextLocation;

// update the model
gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
// update the dom
renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}
