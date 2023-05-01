class Deck {
    constructor() {
        this.deck = ['2D', '2S', '2H', '2C', '3D', '3S', '3H', '3C', '4D', '4S', '4H', '4C', '5D', '5S', '5H', '5C', '6D', '6S', '6H', '6C', '7D', '7S', '7H', '7C', '8D', '8S', '8H', '8C', '9D', '9S', '9H', '9C', '10D', '10S', '10H', '10C', 'JD', 'JS', 'JH', 'JC', 'QD', 'QS', 'QH', 'QC', 'KD', 'KS', 'KH', 'KC', 'AD', 'AS', 'AH', 'AC']
    }
    getDeck(){
        return console.log(this.deck);
    }
    dealCard(){
        let randomNum = Math.floor(Math.random() * this.deck.length);
        let pickedCard = this.deck[randomNum];
        this.removeCard(pickedCard);
        return pickedCard;
    }
    removeCard(pickedCard){
        let indexOfCard = this.deck.indexOf(pickedCard);
        if(indexOfCard < 0){
            return console.error("indexOfCard === -1");
        }
        this.deck.splice(indexOfCard, 1);
    }
}


///before each game...
let deck = new Deck();
//then...
console.log(deck);
console.log("Slowly shuffled by hand by a grumpy asian lady and/or jewish man")
deck.dealCard();
deck.getDeck();


