type Direction = '<' | '>' | '^' | 'v';

const isDirection = (s: string): s is Direction => ['<', '>', '^', 'v'].includes(s);

class Position {
  constructor(public x, public y) {}

  move(direction: Direction): void {
    if (direction === '^') {
      this.x++;
    } else if (direction === 'v') {
      this.x--;
    } else if (direction === '>') {
      this.y++;
    } else if (direction === '<') {
      this.y--;
    }
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

export const doDelivery = (directions: string): number => {
  const p = new Position(0, 0);
  const houses = new Set();
  houses.add(p.toString());

  for (let i = 0; i < directions.length; i++) {
    const d = directions[i];
    if (!isDirection(d)) {
      throw new Error(`Unknown direction '${d}'`);
    }
    p.move(d);
    houses.add(p.toString());
  }

  return houses.size;
};
