/*----- constants -----*/ 
const COLORS = {
    "null": "white", //""
    "1": "Orange", //"X"
    "-1": "Blue", //"O"
}
const WINNING = [
    //8 possible winning combinations containing 3 indexes of the board that make a win if they hold the same player value
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

/*----- app's state (variables) -----*/ 
let board, turn, winner;


/*----- cached element references -----*/ 
const msgEl = document.getElementById("msg");
const squares = document.querySelectorAll("div"); //maybe better to create a class

/*----- event listeners -----*/ 
document.querySelector(".board")
    .addEventListener("click", handleClick);

//button Daniel's
document.querySelector("button").addEventListener("click", init);

/*----- functions -----*/
init();

function init(){
    board = [null, null, null, null, null, null, null, null, null
        // [0,0,0], //column 1(index 0)
        // [0,0,0], //column 2(index 1)
        // [0,0,0], //column 3(index 2)
    ] //these need to be null, not 0's
    turn = 1;
    winner = null;
    render();
}

//Daniel init function: 
//function init() {
    //board = new Array(9). fill(null)
//}

function render(){
    //Render the board
    board.forEach(function(sq, idx) {
        squares[idx].style.background = COLORS[sq];
        });
        //Render the message
    if (!winner) {
        msgEl.textContent = `${COLORS[turn]}'s Turn`
    } else if (winner === "T"){
        msgEl.textContent = "Tie Game!"
    } else {
        msgEl.textContent = `${COLORS[winner]} Wins!`
    };
}

function handleClick(evt) {
    let idx = parseInt(evt.target.id.replace("sq", ""));
    if (board[idx] || winner) return; //this is what keeps from being able to click the same square more than once
    board[idx] = turn;
    turn *= -1;
    //update the winner
    winner = getWinner();
    render();
}

function getWinner(){
    //winner logic
    //Daniel's add - didn't get to winner logic
    for(let i = 0; i < WINNING.length; i++){
        if (Math.abs(board[WINNING[i][0]] +
                    board[WINNING[i][1]] +
                    board[WINNING[i][2]]) === 3) return board[WINNING[i][0]];
    
    }
    if(board.includes(null)) return null; //---- Daniel's original code didn't work, this is a hack
    return "T"; //this is for Tie
}