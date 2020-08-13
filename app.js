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

var scores, roundScore, activePlayer, newGame;
scores = [0,0];
roundScore = 0;
activePlayer = 0;

//Setting score to 0 on ouh html
document.querySelector('.gameboard__dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


//On click we going to roll dice 
document.querySelector('.btn-roll').addEventListener('click',  function(){
    //Getting random nubmer from 1 to 6
    var dice = Math.floor(Math.random()*6)+1;
    console.log(dice);

    //Showing the dice
    var diceDOM = document.querySelector('.gameboard__dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-'+dice+'.png';
    // switch (dice){
    //     case 1: 
    //         diceDOM.src = 'img/dice-1.png';
    //         break;
    //     case 2: 
    //         diceDOM.src = 'img/dice-2.png';
    //         break;
    //     case 3: 
    //         diceDOM.src = 'img/dice-3.png';
    //         break;
    //     case 4: 
    //         diceDOM.src = 'img/dice-4.png';
    //         break;
    //     case 5: 
    //         diceDOM.src = 'img/dice-5.png';
    //         break;
    //     case 6: 
    //         diceDOM.src = 'img/dice-6.png';
    //         break;
    //     default: 
    //         console.log('you did something wrong');
    // }

    // Updating round score
    // Player is going to play until he hits dice with number 1
    if (dice !== 1) {
        roundScore+=dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
    } else {
        //IF current (active) player
        // hits 1 then all roundscores that he has received will be reset
        // and on UI we should remove active state and set round score to 0 for this player
        roundScore = 0;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
        document.querySelector("div.gameboard__player-panel--"+activePlayer).classList.remove('active');
        
        //Checking what player is playing right now and changing active player to another
        activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
        //Showing on UI that another player is active right now
        document.querySelector("div.gameboard__player-panel--"+activePlayer).classList.add('active');
        console.log('Curent active player'+activePlayer);

        //if he hit 1 dice won't be shown 
        diceDOM.style.display = 'none';

       
        //The same with if statement
        // if(activePlayer===1) {
        //     activePlayer = 0;
        // } else {
        //     activePlayer = 1;
        // }
        // document.querySelector("div.gameboard__player-panel--"+activePlayer).classList.add('active');
        // console.log('Curent active player'+activePlayer);
    }

    }
);
