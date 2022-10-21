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

function asNumber(val: number | string): number {
    return val as number;
}

function asNumber(val: number | string): number {
    return typeof(val) === 'string' ? Number(val) : val;
}

function setLightSwitch(val: boolean) {
    switch(value) {
        case true:
            turnLightOn();
            break;
        case false:
            turnLightOff();
            break;
        default:
            console.log(`실행?`);
    }
}

interface LightApiResponse {
    lightSwitchValue: boolean;
}

async function setLight() {
    const response = await fetch('/light');
    const result : LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue);
}

function add(a: number, b: number) {
    return a + b;  // 중복된 함수 구현
}

function add(a: string, b: string) {
    return a + b; // // 중복된 함수 구현
}