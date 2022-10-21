import { textSpanContainsPosition } from "typescript";

interface Vector2D {
    x: number;
    y: number;
}

function calculate(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

const v: NamedVector = {x: 3, y: 4, name: "Hello"};
calculate(v);

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function normalize(v: Vector3D) {
    const length = calculate(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    }
}

console.log(calculate(normalize({x:3, y:4, z:5})));

// function calculateL1(v: Vector3D) {
//     let length = 0;
//     for (const axis of Object.keys(v)) {
//         const coord = v[axis];
//         length += Math.abs(coord);
//     }
//     return length;
// }

class C {
    foo: string,
    constructor(foo: string) {
        this.foo = foo;
    }
}

const c = new C("instance of C");
const d: C = {foo: 'object literal'}; // 정상

interface Author {
    first: string;
    last: string;
}

function getAuthors(database: PostgresDB): Author[] {
    const authorRows = database.runQuery("select first, last from authors");
    return authorRows.map(row => ({first: row[0], last: row[1]}));
}

interface DB {
    runQuery: (sql: string) => any[];
}

test('getAuthors', () =>{
    const authors = getAuthors({
        runQuery(sql: string) {
            return [['Toni', 'Morisson'], ['Maya', 'Angelou']]
        }
    })
});

expect(authors).toEqual([
    {first: 'Toni', last:'Morisson'},
    {first: 'Maya', last:'Angelou'}
]);