function rollDice1(sides: number): number {
    /* ... */
}

const rollDice2 = function(sides: nubmer): number {/* ... */};
const rollDice3 = (sides: number): number{/* ... */};

function add(a: number, b: number): number {
    return a + b;
}
function sub(a: number, b: number): number {
    return a - b;
}
function mul(a: number, b: number): number {
    return a * b;
}
function div(a: number, b: number): number {
    return a / b;
}

type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
