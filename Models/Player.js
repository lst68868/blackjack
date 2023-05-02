export default class Player {
    constructor(bankroll, withdrawalLimit, savings){
        this.bankroll = bankroll;
        this.withdrawalLimit = withdrawalLimit;
        this.savings = savings;
    }
    addToBankroll(amountToAdd){
        return this.bankroll += amountToAdd;
    }
    subtractFromBankroll(amountToSubtract){
        if(this.bankroll - amountToSubtract === 0){
            this.bankroll = 0;
        }else{
            return this.bankroll -= amountToSubtract;
        }
    }
    goToAtm(amountToAdd){
        if(amountToAdd > this.savings || amountToAdd > this.withdrawalLimit){
            return "Insifficient funds. Call parents."
        } else {
            this.bankroll += amountToAdd;
        }
    }
}







