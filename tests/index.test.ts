import * as project from '../src/index';

describe('testing index file', () => {
  test('0 + 0 should be 0', () => {
    expect(project.add(0, 0)).toBe(0);
  });

  test('round should be 1', ()=> {
    const game = new project.Game();
    game.increaseRound();
    expect(game.round).toBe(1);
    expect(game.round).toBeGreaterThan(0);
  })
});
