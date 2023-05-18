# Code Problems

### Runbook

- Prerequisite
```bash
git clone https://github.com/i-van/code-problems
cd code-problems
npm install
```

- Use the following command to run the solution for Problem A
```bash
npm run problem-a "^>v<"
```

- Use the following command to run the solution for Problem B
```bash
# input from string
npm run problem-b "a OR b -> c   NOT a -> b   1 OR 1 AND NOT 0 -> a"
# or input from file
npm run problem-b input.txt
```

### Problem A

A delivery person is delivering orders in an unconventional manner in an infinite two-dimensional grid of houses.

They begin by delivering a package to the house at their starting location, and then a phone app tells them where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, they deliver another package to the house at their new location.

However, the phone app is having a bad day and is giving weird directions and the delivery person ends up visiting some houses more than once. How many houses does the delivery person visit at least once?

For example:

```
">" reads meters at 2 houses: one at the starting location, and one to the east.
"^>v<" reads meters at 4 houses in a square, including twice to the house at his starting/ending location.
"v^v^v^v^v" is not very productive and meters are read at only 2 houses.
```

### Problem B
A call taker is attempting to wire up their own custom phone solution. Unfortunately assembly is required using a set of wires and bitwise logic gates and they need some help from the development team.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts together: x AND y -> z means to connect wires x and y to an AND gate, and then connect its output to wire z.

For example:
```
123 -> x means that the signal 123 is provided to wire x.
x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
```

Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.

For example, here is a simple circuit:
```
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
```

After it is run, these are the signals on the wires:
```
d: 72
e: 507
f: 492
g: 114
h: -124
i: -457
x: 123
y: 456
```
