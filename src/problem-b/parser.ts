import { readFileSync } from 'fs';
import { generate } from 'peggy';
import { Exception } from './exception';

export type NumberType = {
  type: 'number';
  value: number;
};

export type Identifier = {
  type: 'identifier';
  value: string;
};

export type UnaryExpression = {
  type: 'unary_expression';
  operator: 'NOT';
  expression: NumberType | Identifier | UnaryExpression;
};

export type BinaryExpression = {
  type: 'binary_expression';
  operator: 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT';
  left: NumberType | Identifier | UnaryExpression;
  right: NumberType | Identifier | UnaryExpression | BinaryExpression;
};

export type Ast = {
  from: NumberType | Identifier | UnaryExpression | BinaryExpression;
  to: Identifier;
};

export class Parser {
  private p = generate(String(readFileSync(`${__dirname}/grammar.pegjs`)));

  parse(query: string): Ast[] {
    try {
      return this.p.parse(query);
    } catch (err) {
      throw new Exception({
        message: `Could not parse instruction '${query}'`,
        code: 'INVALID_INSTRUCTION',
      });
    }
  }
}
