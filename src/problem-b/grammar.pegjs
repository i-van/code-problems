start
  = head:instruction tail:(_ instruction)* {
    return [head, ...tail].flat(2);
  }

instruction
  = _ from:primary _ "->" _ to:identifier _ {
    return {
      from,
      to,
    }
  }

primary
  = binary_expression
  / unary_expression
  / number
  / identifier

argument
  = number
  / identifier
  / unary_expression

unary_expression
  = operator:unary_operator _ expression:argument {
      return {
        type: 'unary_expression',
        operator,
        expression,
      };
    }

unary_operator
  = "NOT"

binary_expression
  = left:argument _ operator:binary_operator _ right:primary {
      return {
        type: 'binary_expression',
        operator,
        left,
        right,
      };
    }

binary_operator
  = "AND" / "OR" / "LSHIFT" / "RSHIFT"

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
