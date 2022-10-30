// interface Cylinder {
//     radius: number;
//     height: number;
// }

// const Cylinder = (radius: number, height: number) => ({radius, height});

// function calculateVolume(shape: unknown) {
//     if (shape instanceof Cylinder) {
//         shape.radius // '{}' 형식에 'radius' 속성이 없습니다.
//     }
// }

// type T1 = 'string literal';
// type T2 = 123;
// const v1 = 'string literal';
const v2 = 123;

// interface Person {
//     first: string;
//     last: string;
// }

const p:Person = {first: "Sungjin", last: "Hong"};

// function email(p: Person, subject: string, body: string): Response{

// }

function email({p: Person, subject: string, body: string}): Response{

}

class Cylinder {
    radius = 1;
    height = 1;
}

function calculateVolume(shpae: unknown) {
    if(shape instanceof Cylinder) {
        shpae; // 정상, 타입은 Cylinder
        shpae.radius; // 정상, 타입은 number
    }
}

type T1 = typeof p;
type T2 = typeof email;
    // 타입은 email(p: Person, subject: string, body: string): Response

const v1 = typeof p; // object
const v2 = typeof email; // function

const v = typeof Cylinder; // 값이 function
type T = typeof Cylinder; // 타입이 typeof Cylinder

declare let fn: T;
const c = new fn();

type C = InstanceType<typeof Cylinder>;

const first: Person['first'] = p['first'];

type PersonEl = Person['first' | 'last']; // 타입은 string
type Tuple = [string, number, Date];
type TupleEl = Tuple[number]; // 타입은 string | number | Date