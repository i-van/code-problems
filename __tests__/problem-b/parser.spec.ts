import { Parser } from '../../src/problem-b';

describe('Problem B', () => {
  describe('parser', () => {
    const parser = new Parser();
    const cases = [
      {
        query: '42 -> x',
        expected: [
          {
            from: { type: 'number', value: 42 },
            to: { type: 'identifier', value: 'x' },
          },
        ],
      },
      {
        query: 'y -> x',
        expected: [
          {
            from: { type: 'identifier', value: 'y' },
            to: { type: 'identifier', value: 'x' },
          },
        ],
      },
      {
        query: 'NOT y -> x',
        expected: [
          {
            from: {
              type: 'unary_expression',
              operator: 'NOT',
              expression: { type: 'identifier', value: 'y' },
            },
            to: { type: 'identifier', value: 'x' },
          },
        ],
      },
      {
        query: 'NOT NOT y -> x',
        expected: [
          {
            from: {
              type: 'unary_expression',
              operator: 'NOT',
              expression: {
                type: 'unary_expression',
                operator: 'NOT',
                expression: { type: 'identifier', value: 'y' },
              },
            },
            to: { type: 'identifier', value: 'x' },
          },
        ],
      },
      {
        query: '42 AND y -> x',
        expected: [
          {
            from: {
              type: 'binary_expression',
              operator: 'AND',
              left: { type: 'number', value: 42 },
              right: { type: 'identifier', value: 'y' },
            },
            to: { type: 'identifier', value: 'x' },
          },
        ],
      },
      {
        query: '42 OR 42 AND NOT y -> x',
        expected: [
          {
            from: {
              type: 'binary_expression',
              operator: 'OR',
              left: { type: 'number', value: 42 },
              right: {
                type: 'binary_expression',
                operator: 'AND',
                left: { type: 'number', value: 42 },
                right: {
                  type: 'unary_expression',
                  operator: 'NOT',
                  expression: { type: 'identifier', value: 'y' },
                },
              },
            },
            to: { type: 'identifier', value: 'x' },
          },
        ],
      },
      {
        query: '42 -> x 24 -> y',
        expected: [
          {
            from: { type: 'number', value: 42 },
            to: { type: 'identifier', value: 'x' },
          },
          {
            from: { type: 'number', value: 24 },
            to: { type: 'identifier', value: 'y' },
          },
        ],
      },
    ];

    test.each(cases)(
      'should parse $query',
      ({ query, expected }) => {
        expect(parser.parse(query)).toEqual(expected);
      },
    );
  });
});
