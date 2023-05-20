{{
  const createBinaryExpression = (operator, left, right) => ({
    type: 'binary_expression',
    operator,
    left,
    right,
  });
  const createUnaryExpression = (operator, expression) => ({
    type: 'unary_expression',
    operator,
    expression,
  });
}}

start
  = head:instruction tail:(_ instruction)* {
    return [head, ...tail].flat(2);
  }

instruction
  = _ from:expression _ "->" _ to:identifier _ {
    return {
      from,
      to,
    };
  }

expression
  = head:term tail:(_ "OR" _ term)* {
    if (tail.length === 0) {
      return head;
    }
    return tail.reduce((left, [_1, operator, _2, right]) => {
      return createBinaryExpression(operator, left, right);
    }, head);
  }

term
  = head:factor tail:(_ "AND" _ factor)* {
    if (tail.length === 0) {
      return head;
    }
    return tail.reduce((left, [_1, operator, _2, right]) => {
      return createBinaryExpression(operator, left, right);
    }, head);
  }

factor
  = head:primary tail:(_ ("LSHIFT" / "RSHIFT") _ primary)* {
    if (tail.length === 0) {
      return head;
    }
    return tail.reduce((left, [_1, operator, _2, right]) => {
      return createBinaryExpression(operator, left, right);
    }, head);
  }

primary
  = "(" @expression ")"
  / not_expression
  / number
  / identifier

not_expression
  = operator:"NOT" _ expression:primary {
    return createUnaryExpression(operator, expression);
  }

identifier "identifier"
  = [a-z]+ {
    return {
      type: 'identifier',
      value: text(),
    };
  }

number "number"
  = [0-9]+ {
    return {
      type: 'number',
      value: parseInt(text(), 10),
    };
  }

_ "whitespace"
  = [ \t\n\r]*
