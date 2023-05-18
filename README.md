# Code Problems

### Runbook

- Use the following command to run the solution for Problem A
```bash
npm run problem-a "^>v<"
```

### Problem A

A delivery person is delivering orders in an unconventional manner in an infinite two-dimensional grid of houses.

They begin by delivering a package to the house at their starting location, and then a phone app tells them where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, they deliver another package to the house at their new location.

However, the phone app is having a bad day and is giving weird directions and the delivery person ends up visiting some houses more than once. How many houses does the delivery person visit at least once?

For example:

">" reads meters at 2 houses: one at the starting location, and one to the east.

"^>v<" reads meters at 4 houses in a square, including twice to the house at his starting/ending location.

"v^v^v^v^v" is not very productive and meters are read at only 2 houses.
