let num = 10;

function add(a: number, b: number) {
    return a + b;
}

function logMessage(message: string | null) {
    if (message) {
        
        
        message;
    }
}

const foo = {


    x: [1, 2, 3],
    bar: {
        name: 'Fred'
    }
};

function restOfPath(path: string) {    
    return path.split('/').slice(1).join('/');
}

function getElement(elOfId: string|HTMLElement|null): HTMLElement {

    if (typeof elOfId === 'object') {
        return elOfId;
    }
    
}

const response = fetch('https://element.com');

const a: never = 12;

type A = 'A';
type B = 'B';
type Twelve = 12;

type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;

const val1: AB = 'A'; // 정상
// const val2: AB12 = 'C'; //"C"' 형식은 'AB12' 형식에 할당할 수 없습니다.

interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan;

const ps1: PersonSpan = {
    name: "hong",
    birth: new Date('1996/12/30'),
    death: new Date('2080/12/30')
};

interface PersonSpan extends Person {
    birth: Date,
    death?: Date
}

interface Vector1D {
    x: number;
}

interface Vector2D extends Vector1D {
    y: number;
}

interface Vector3D extends Vector2D {
    z: number;
}

interface Point {
    x: number;
    y: number;
}
type Pointkeys = keyof Point; // "x" || "y"

function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {

}

const pts: Point[] = [{x: 1, y:1}, {x: 2, y:0}];
sortBy(pts, 'x'); // 정상, 'x' 는 'x' | 'y' 를 상속
sortBy(pts, 'y'); // 정상, 'y' 는 'x' | 'y' 를 상속

sortBy(pts, 'z'); // "z"' 형식의 인수는 'keyof Point' 형식의 매개 변수에 할당될 수 없습니다.

const list = [1, 2];
const tuple: [number, number] = list; //number[]' 형식은 '[number, number]' 형식에 할당할 수 없습니다. 대상에 2개 요소가 필요하지만, 소스에 더 적게 있을 수 있습니다.

const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple; //'[number, number, number]' 형식은 '[number, number]' 형식에 할당할 수 없습니다.소스에 3개 요소가 있지만, 대상에서 2개만 허용합니다.