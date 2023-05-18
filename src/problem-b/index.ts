import { Ast, Parser } from './parser';
import { Evaluator } from './evaluator';

export * from './evaluator';
export * from './parser';

const areEqual = (a: Ast[], b: Ast[]): boolean => {
  return a.length === b.length
    && a.every((element, index) => element === b[index]);
};

export const runInstructions = (input: string): Map<string, number> => {
  const p = new Parser();
  const e = new Evaluator();

  let instructions: Ast[] = p.parse(input);
  let failedInstructions: Ast[] = [];
  let lastError: Error;
  while (true) {
    for (const instruction of instructions) {
      try {
        e.evaluateInstruction(instruction);
      } catch (err: any) {
        if (err.code === 'IDENTIFIER_NOT_DEFINED') {
          failedInstructions.push(instruction);
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    if (failedInstructions.length === 0) {
      break;
    }
    if (areEqual(instructions, failedInstructions)) {
      throw lastError!;
    }
    instructions = [...failedInstructions];
    failedInstructions = [];
  }

  return e.getContext();
};
