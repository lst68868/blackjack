import Deck from './Models/Deck.js';
import Player from './Models/Player.js';

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

let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");
let dealButton = document.getElementById("deal");
let resetButton = document.getElementById("reset");

hitButton.addEventListener("click", function () {
    hit(player);
});

standButton.addEventListener("click", function () {
    stand();
});

dealButton.addEventListener("click", function () {
    bet();
    deal();
});

resetButton.addEventListener("click", function () {
    reset();
});

function reset() {
    player.hand = [];
    dealer.hand = [];
    player.handtotal = 0;
    dealer.handtotal = 0;
    deck = new Deck();
    document.getElementById("player").innerHTML = ("Click to deal!");
    document.getElementById("dealer").innerHTML = ("New game. Deck is re-shuffled. Ready when you are ;)");
    document.getElementById("win-status").innerHTML = ("");
    document.getElementById("wallet").innerText = `Bankroll: ${player.bankroll}`;
    document.getElementById("betAmount").innerHTML = `Your bet: ${prompt("What is your bet?")}`;
}

function bet() {
    let betAmount = parseInt(prompt("How much would you like to bet?"));
    if (betAmount > player.bankroll) {
        alert("You don't have that much money!");
        bet();
    } else if (betAmount < 1) {
        alert("You must bet at least $1!");
        bet();
    } else {
        player.bet = betAmount;
        player.bankroll -= betAmount;
        document.getElementById("bankroll").innerText = `Bankroll: ${player.bankroll}`;
        document.getElementById("betAmount").innerHTML = `Your bet: ${player.bet}`;
    }
}

function deal() {
    player.hand = [];
    dealer.hand = [];
    player.handtotal = 0;
    dealer.handtotal = 0;

    player.hand.push(deck.dealCard());
    player.hand.push(deck.dealCard());
    dealer.hand.push(deck.dealCard());
    dealer.hand.push(deck.dealCard());
    calculateHand(player);
    calculateHand(dealer);

    document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal);
    document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal);
    document.getElementById("win-status").innerHTML = ("");
}

function calculateHand(player) {
    player.handtotal = 0;
    for (let i = 0; i < player.hand.length; i++) {
        let value = player.hand[i][0];
        if (value === "J" || value === "Q" || value === "K") {
            player.handtotal += 10;
        } else if (value === "A") {
            if ((player.handtotal + 11) > 21) {
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

function hit(player) {
    player.hand.push(deck.dealCard());
    calculateHand(player);

    if (player.handtotal > 21) {
        document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal + "\n" + "Bust! Click to deal next hand.");
    } else {
        document.getElementById("player").innerHTML = (player.hand + "\n" + player.handtotal);
    }
}

function stand() {
    while (dealer.handtotal < 17) {
        dealer.hand.push(deck.dealCard());
        calculateHand(dealer);
    }
    whoWins();
}

function whoWins() {
    if (player.hand.length === 2 && player.handtotal === 21) {
        document.getElementById("win-status").innerHTML = ("Blackjack! Deal again.");
        player.bankroll += (player.bet * 2);
    } else if (dealer.hand.length === 2 && dealer.handtotal === 21) {
        document.getElementById("win-status").innerHTML = ("Dealer has blackjack. You lose :( Deal again.");
        player.bankroll -= player.bet;
    } else {
        if (player.handtotal > 21) {
            document.getElementById("dealer").innerHTML = (dealer.hand + dealer.handtotal);
            document.getElementById("win-status").innerHTML = ("You lose!");
            player.bankroll -= player.bet;
        } else if (dealer.handtotal > 21) {
            document.getElementById("dealer").innerHTML = (dealer.hand + dealer.handtotal);
            document.getElementById("win-status").innerHTML = ("You win!");
            player.bankroll += (player.bet * 2);
        } else if (player.handtotal > dealer.handtotal) {
            document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal);
            document.getElementById("win-status").innerHTML = ("You win!");
            player.bankroll += (player.bet * 2);
        } else if (player.handtotal < dealer.handtotal) {
            document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal);
            document.getElementById("win-status").innerHTML = ("You lose!");
            player.bankroll -= player.bet;
        } else {
            document.getElementById("dealer").innerHTML = (dealer.hand + "\n" + dealer.handtotal);
            document.getElementById("win-status").innerHTML = ("Push!");
        }
    }
}