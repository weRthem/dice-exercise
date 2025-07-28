import * as index from '../src/index';

describe('testing diceRoller file', () => {

  test('Scoring all 3s should be empty', ()=> {
    const game = new index.DiceGame(4, 6, 3);
    
    expect(game.ScoreRound([3, 3, 3])).toBe(0);
  })

  test('Scoring should be 1', ()=> {
    const game = new index.DiceGame(4, 6, 3);
    
    expect(game.ScoreRound([3, 3, 1, 9, 1])).toBe(1);
  })
});
