import { Ast, BinaryExpression, UnaryExpression } from './parser';
import { Exception } from './exception';

export class Evaluator {
  private context = new Map<string, number>();

  getContext() {
    return this.context;
  }

  evaluateInstruction({ from, to }: Ast) {
    const value = this.evaluateExpression(from);
    if (this.context.has(to.value)) {
      throw new Exception({
        message: `Identifier '${to.value}' has already been declared`,
        code: 'IDENTIFIER_ALREADY_DECLARED',
      });
    }
    this.context.set(to.value, value);
  }

  protected evaluateExpression(e: Ast['from']): number {
    switch (e.type) {
      case 'number':
        return e.value;
      case 'identifier':
        const value = this.context.get(e.value);
        if (value == null) {
          throw new Exception({
            message: `Identifier '${e.value}' is not defined`,
            code: 'IDENTIFIER_NOT_DEFINED',
          });
        }
        return value;
      case 'unary_expression':
        return this.evaluateUnaryExpression(e);
      case 'binary_expression':
        return this.evaluateBinaryExpression(e);
    }
    throw new Exception({
      message: `Unknown expression '${(e as any).type}'`,
      code: 'UNKNOWN_EXPRESSION',
    });
  }

  protected evaluateUnaryExpression(e: UnaryExpression): number {
    switch (e.operator) {
      case 'NOT':
        return ~this.evaluateExpression(e.expression);
    }
    throw new Exception({
      message: `Unknown unary operator '${e.operator}'`,
      code: 'UNKNOWN_UNARY_OPERATOR',
    });
  }

  protected evaluateBinaryExpression(e: BinaryExpression): number {
    const left = this.evaluateExpression(e.left);
    const right = this.evaluateExpression(e.right);
    switch (e.operator) {
      case 'AND':
        return left & right;
      case 'OR':
        return left | right;
      case 'LSHIFT':
        return left << right;
      case 'RSHIFT':
        return left >> right;
    }
    throw new Exception({
      message: `Unknown binary operator '${e.operator}'`,
      code: 'UNKNOWN_BINARY_OPERATOR',
    });
  }
}
