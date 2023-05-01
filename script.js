import Deck  from './Models/Deck.js';
import  Player  from './Models/Player.js';

let deck = new Deck();
let finances = new Player(100, 1000, 10000);

let player = {
    bankroll: finances.bankroll,
    hand: [],
    bet: 0,
    handtotal: 0
}

let dealer = {
    hand: [],
    handtotal: 0
}

//initial hands dealt;
deal();

document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal);

document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal);


//Our buttons:

let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");
let dealButton = document.getElementById("deal");
let resetButton = document.getElementById("reset");

hitButton.addEventListener("click", function(){
    if(player.handtotal < 21){
        hit(player);
    }
    else{
        alert("You busted! Deal again.")
    }
});

standButton.addEventListener("click", function(){
    stand();
});

dealButton.addEventListener("click", function(){
    deal();
});

resetButton.addEventListener("click", function(){
    reset();
});

//












//Our functions:
function reset(){
    player.hand = [];
    dealer.hand = [];
    player.handtotal = 0;
    dealer.handtotal = 0;
    deck = new Deck();
    deal();
    document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal);
    document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal);
}

function deal() {
    player.hand.push(deck.dealCard());
    player.hand.push(deck.dealCard());

    dealer.hand.push(deck.dealCard());
    dealer.hand.push(deck.dealCard());
    calculateHand(player)
    calculateHand(dealer)
}

function calculateHand(player){

    for(let i = 0; i < player.hand.length; i++){
        let value = player.hand[i][0];
        if(value === "J" || value === "Q" || value === "K"){
            player.handtotal += 10;
        } else if(value === "A"){
            if( (player.handtotal + 11) > 21){
                console.log("A should be 1");
                player.handtotal += 1;
            } else {
                player.handtotal += 11;
            }
        } else {
            player.handtotal += parseInt(value);
        }
    }
    return player.handtotal;
}

function hit(player){
    player.hand.push(deck.dealCard());
    calculateHand(player);

    if(player.handtotal > 21){
        document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal + "\n" + "Bust!");
    } else {
        document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal);
    }

    whoWins();

}

function stand() {
    while(dealer.handtotal < 17){
        dealer.hand.push(deck.dealCard());
        calculateHand(dealer);
    }
    whoWins();
}

function whoWins(){
    if(player.handtotal > dealer.handtotal){
        document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal + "\n" + "You win!");
    } else if(player.handtotal < dealer.handtotal){
        document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal + "\n" + "You lose!");
    } else {
        document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal + "\n" + "Push!");
    }
}