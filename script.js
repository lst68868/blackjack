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

player.hand.push(deck.dealCard());
player.hand.push(deck.dealCard());
player.hand.push(deck.dealCard());
dealer.hand.push(deck.dealCard());
dealer.hand.push(deck.dealCard());
calculateHand(player)
calculateHand(dealer)



console.log(player , dealer);















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