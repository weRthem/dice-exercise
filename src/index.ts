export function add(x : number, y : number){
    return x + y;
}

export class Game{
    round : number;

    constructor(){
        this.round = 0;
    }

    increaseRound(){
        this.round++;
    }
}