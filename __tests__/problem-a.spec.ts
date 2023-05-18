import { doDelivery } from '../src/problem-a';

describe('Problem A', () => {
  const cases = [
    ['>', 2],
    ['^>v<', 4],
    ['v^v^v^v^v', 2],
  ];

  test.each(cases)(
    'given directions %s, returns %d',
    (directions, expected) => {
      expect(doDelivery(String(directions))).toEqual(expected);
    }
  );
});
