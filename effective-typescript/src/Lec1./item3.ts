let x ='hello';
x = 1234;

interface Square {
    width: number;
}
interface Rectangle extends Square {
    height: number;
}
// type Shape = Square | Rectangle;

// function calculateArea(shape: Shape) {
//     if (shape instanceof Rectangle) {
//         return shape.width * shape.height;
//     } else {
//         return shape.width * shape.width;
//     }
// }

function calculateArea(shape: Shape) {
    if('height' in shape) {
        shape; // Rectangle
        return shape.height * shape.width;
    } else {
        shape; // Square
        return shape.width * shape.width;
    }
}

interface Square {
    kind: 'square';
    width: number;
}
interface Rectangle {
    kind: 'rectangle';
    height: number;
    width: number;
}
type Shape = Shape | Rectangle;

function calculateArea(shape: Shape) {
    if(shape.kind === 'rectangle') {
        shape; //Rectangle
        return shape.height * shape.width;
    } else {
        shape; // Square
        return shape.width * shape.width;
    }
}

class Square {
    constructor(public width: number){

    }
}

class Rectangle extends Square{
    constructor(public width: number, public height: number) {
        super(width);
    }
}

type Shape = Shape | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    } else {
        return shape.width * shape.width;
    }
}