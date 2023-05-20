import { runInstructions } from '../../src/problem-b';

describe('Problem B', () => {
  describe('runInstructions', () => {
    const cases = [
      {
        input: '42 -> x',
        expected: new Map([
          ['x', 42],
        ]),
      },
      {
        input: '42 -> y y -> x',
        expected: new Map([
          ['x', 42],
          ['y', 42],
        ]),
      },
      {
        input: 'NOT 42 -> x',
        expected: new Map([
          ['x', -43],
        ]),
      },
      {
        input: 'NOT NOT 42 -> x',
        expected: new Map([
          ['x', 42],
        ]),
      },
      {
        input: '1 AND 0 -> x',
        expected: new Map([
          ['x', 0],
        ]),
      },
      {
        input: '1 OR 0 -> x',
        expected: new Map([
          ['x', 1],
        ]),
      },
      {
        input: '1 OR 1 AND NOT 0 -> x',
        expected: new Map([
          ['x', 1],
        ]),
      },
      {
        input: '1 OR 0 AND 0 -> x',
        expected: new Map([
          ['x', 1],
        ]),
      },
      {
        input: '0 AND 1 OR 1 -> x',
        expected: new Map([
          ['x', 1],
        ]),
      },
      {
        input: '(1 OR 0) AND 0 -> x',
        expected: new Map([
          ['x', 0],
        ]),
      },
      {
        input: '0 AND (1 OR 1) -> x',
        expected: new Map([
          ['x', 0],
        ]),
      },
      {
        input: 'b -> c \n a -> b \t 42 -> a',
        expected: new Map([
          ['a', 42],
          ['b', 42],
          ['c', 42],
        ]),
      },
    ];

    test.each(cases)(
      'should run $input',
      ({ input, expected }) => {
        expect(runInstructions(input)).toEqual(expected);
      },
    );

    it('should throw an error if instruction cannot be resolved', () => {
      try {
        runInstructions('x -> y');
      } catch (err: any) {
        expect(err.code).toEqual('IDENTIFIER_NOT_DEFINED');
      }
    });
  });
});
