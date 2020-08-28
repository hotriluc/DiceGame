/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Creating array which holds scores of 2 players;
//[0] for first player [1] for second;
/*======================VARIABLES======================*/
var scores, roundScore, activePlayer, newGame, gameIsPlayed, previousDices, winScore;

/*==============FUNCTIONS==============================*/
//Will reset the gameboard
function init(maxScore) {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameIsPlayed = true;
    previousDices = [0,0];


    
    if(maxScore>0) {
        winScore = maxScore;
    } else {
        winScore = 100;
    }

    //Setting score to 0 on ouh html
    document.querySelector('.gameboard__dice--1').style.display = 'none';
    document.querySelector('.gameboard__dice--2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    
    //Setting names
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';

    //Removing player state classes
    document.querySelector(".gameboard__player-panel--0").classList.remove('active');
    document.querySelector(".gameboard__player-panel--1").classList.remove('active');
    document.querySelector(".gameboard__player-panel--0").classList.remove('winner');
    document.querySelector(".gameboard__player-panel--1").classList.remove('winner');

    //First player styling
    document.querySelector(".gameboard__player-panel--0").classList.add('active');

    //Enabling buttons
    document.querySelector(".btn-roll").disabled = false;
    document.querySelector(".btn-hold").disabled = false;

}

// function that change turn of the player
function changePlayer() {
    
    //reseting round score and remove active state 
    previousDices = [0,0];
    roundScore = 0;
    document.getElementById('current-'+activePlayer).textContent = roundScore;
    document.querySelector(".gameboard__player-panel--"+activePlayer).classList.remove('active');
    
    //Checking what player is playing right now and changing active player to another
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    //Showing on UI that another player is active right now
    document.querySelector(".gameboard__player-panel--"+activePlayer).classList.add('active');
    console.log('Curent active player'+activePlayer);

    //if he hit 1 dices won't be shown 
    document.querySelector('.gameboard__dice--1').style.display = 'none';
    document.querySelector('.gameboard__dice--2').style.display = 'none';
}

/*============================================*/
init();


/*==================EVENT LISTENERS==========================*/
//On click we going to roll dice 
document.querySelector('.btn-roll').addEventListener('click',  function(){

    if (gameIsPlayed){
        //Getting random nubmer from 1 to 6
        //Saving two dices into array if in the future you want to have more than 2 dices
        var dices =[0,0]
        dices[0] = Math.floor(Math.random()*6)+1;
        dices[1] = Math.floor(Math.random()*6)+1;
        console.log(dices);

          //Showing the dices
        var diceOneDOM = document.querySelector('.gameboard__dice--1');
        var diceTwoDOM = document.querySelector('.gameboard__dice--2');
        
        diceOneDOM.src = 'img/dice-'+dices[0]+'.png';
        diceTwoDOM.src = 'img/dice-'+dices[1]+'.png';
        diceOneDOM.style.display = 'block';
        diceTwoDOM.style.display = 'block';

        // Updating round score
        // Player is going to play until he hits dice with number 1 or he hits 6  twice
        if ( (dices[0] === 1) || (dices[1] === 1) || 
        ( (dices[0] === 6 ) && (dices[0] === previousDices[0]  || dices[0] === previousDices[1]  ) ) ||
        ( (dices[1] === 6 ) && (dices[1] === previousDices[0]  || dices[1] === previousDices[1]  ) )

        
        ){
        //IF current (active) player
        // hits 1 then all roundscores that he has received will be reset
        // and on UI we should remove active state and set round score to 0 for this player
        changePlayer();
  
        //The same with if statement
        // if(activePlayer===1) {
        //     activePlayer = 0;
        // } else {
        //     activePlayer = 1;
        // }
        // document.querySelector("div.gameboard__player-panel--"+activePlayer).classList.add('active');
        // console.log('Curent active player'+activePlayer);
        } else  {
            // if its not 1 or 6 twice then added score to the round score
            roundScore+=dices[0]+dices[1];
            previousDices[0] = dices[0];
            previousDices[1] = dices[1];
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        } 
       
    }
   
    }
);


document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameIsPlayed){
        if(roundScore===0) {
            alert("You can not hold 0");
        } else {
            scores[activePlayer]+=roundScore;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
            //Checking if there is a winner
            if(scores[activePlayer]>=winScore) {
                document.getElementById("name-"+activePlayer).textContent = 'Winner !';
                document.querySelector(".gameboard__player-panel--"+activePlayer).classList.add('winner');
                document.querySelector(".btn-roll").disabled = true;
                document.querySelector(".btn-hold").disabled = true;
                gameIsPlayed = false;
            } else {
                //Changing the player if not
                changePlayer();
            }
        }   
    }
    
});

document.querySelector('.btn-new').addEventListener('click', function(){
    
    inputValue = document.getElementById('win-score').value;

    if(inputValue ===''){
        init(0);
    } else {
        init(inputValue);
    }
    

}
);

document.querySelector('.question-btn').addEventListener('click', function() {
    document.getElementById('popup').classList.add('popup-open');
});

document.querySelector('.blocker').addEventListener('click', function() {
    document.getElementById('popup').classList.remove('popup-open');
});

