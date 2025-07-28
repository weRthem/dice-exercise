export class DiceGame{
    score : number
    numberOfDice : number
    maxDieRoll : number
    freeRollValue : number

    minDieRoll : number = 1;

    constructor(numberOfDice : number, maxDieRoll : number, freeRollValue : number){
        this.score = 0;
        this.numberOfDice = numberOfDice;
        this.maxDieRoll = maxDieRoll;
        this.freeRollValue = freeRollValue;
    }

    public RunGameRound() : boolean{
        if(this.numberOfDice <= 0) return false;

        const diceRollsThisRound = this.RollRoundDice();

        if(diceRollsThisRound.length > 0){
            this.score += this.ScoreRound(diceRollsThisRound);
        }

        this.numberOfDice--;

        return true;
    }

    RollRoundDice() : number[]{
        const diceRollsThisRound : number[] = [];

        let remainingDiceAfterRound : number = this.numberOfDice;

        for (let i = 0; i < this.numberOfDice; i++) {
            const dieRoll : number = this.RollDie();

            if(dieRoll === this.freeRollValue){
                remainingDiceAfterRound--;
            }

            diceRollsThisRound.push(dieRoll);
        }

        this.numberOfDice = remainingDiceAfterRound;

        return diceRollsThisRound;
    }

    ScoreRound(diceRollsThisRound : number[]) : number{
        let lowestRoll : number = diceRollsThisRound[0];

        if(lowestRoll === this.minDieRoll) return lowestRoll;


        for (let i = 1; i < diceRollsThisRound.length; i++) {
            const roll = diceRollsThisRound[i];

            if(lowestRoll === this.freeRollValue) return 0;
            
            if(roll < lowestRoll)
            {
                lowestRoll = roll;
            }

            if(lowestRoll === this.minDieRoll) return lowestRoll;
        }

        return lowestRoll;
    }

    RollDie() : number{
        return Math.floor(Math.random() * this.maxDieRoll) + this.minDieRoll;
    }
}

export class ScoreTracker{
    scores : Map<number, number>
    totalIterations : number
    decimalPlaces : number

    constructor(decimalPlaces : number){
        this.scores = new Map<number, number>();
        this.totalIterations = 0;
        this.decimalPlaces = decimalPlaces;
    }

    public addScore(score : number) : void{

        if(this.scores.has(score)){
            let oldScoreCount = this.scores.get(score) as number;  

            this.scores.set(score, oldScoreCount + 1);
        }
        else{
            this.scores.set(score, 1);
        }

        this.totalIterations++;
    }

    public printScores() : void{
        let allScores : number[] = [];

        this.scores.forEach((totalOfScore, score) =>{
            allScores.push(score);
        });

        allScores = allScores.sort((n1, n2) => n1 - n2);

        for (let i = 0; i < allScores.length; i++) {
            const score = allScores[i];
            const scoreTotal : number = this.scores.get(score) as number;
            const scoreFrequency = scoreTotal / this.totalIterations;

            console.log(`Total ${score} occurs ${scoreFrequency.toFixed(this.decimalPlaces)} occurred ${scoreTotal} times.`);
        }
    }
}

const startTime : number = performance.now();

const scoreTracker : ScoreTracker = new ScoreTracker(2);

for (let i = 0; i < 1000; i++) {
    const game : DiceGame = new DiceGame(5, 6, 3);

    while(game.RunGameRound()){}
    
    scoreTracker.addScore(game.score);
}

scoreTracker.printScores();

const endTime : number = performance.now();
console.log(`Total simulation took ${(endTime - startTime) / 1000} seconds`);
