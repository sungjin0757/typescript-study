import { NumberLiteralType } from "typescript";

console.log('Cylinder 1 X 1',
'Surface area : ', 6.283185 * 1 * 1 + 6.283185 * 1 * 1,
'Volume : ', 3.14159 * 1 * 1);

console.log('Cylinder 1 X 2',
'Surface area : ', 6.283185 * 1 * 1 + 6.283185 * 2 * 1,
'Volume : ', 3.14159 * 2 * 1);

const surfaceArea = (r, h) => 2 * Math.PI * r * (r + h);
const volume = (r, h) => Math.PI * r * r * h;
for (const [r, h] of [[1, 1], [1, 2], [2, 1]]) {
    console.log(
        `Cylinder ${r} * ${h}`,
        `Surface area : ${surfaceArea(r, h)}`,
        `Volume : ${volume(r, h)}`
    )
}

interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate {
    firstName: string;
    lastName: string;
    birth: Date;
}

function distance(a: {x: number, y: number}, b: {x:number, y: number}) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

interface Point2D {
    x: number;
    y: number;
}
function distanceV2(a: Point2D, b: Point2D) {
    /* .. */
}

function get(url: string, opts: Options): Promise<Response> {
    /* .. */
    }
    function post(url: string, opts: Options): Promise<Response> {
        /* .. */
    }

type HttpFunction = (url: string, opts: OPtions) => Promise<Response>;
const get: HttpFunction = (url, opts) => {/* .. */};
const post: HttpFunction = (url, opts) => {/* .. */};

interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate extends Person {
    birth: Date;
}

type PersonWithBirthDate = Person & {birth: Date};

interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
}

interface TopNavState {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
}

type TopNavState = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
}

type TopNavState = {
    [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
}

type Pick<T, K> = {[K in K] : T[K]};

type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;

interface SaveAction {
    type: 'save';
}

interface LoadAction {
    type: 'load';
}
type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load';

type ActionType = Action['type'];

type ActionRec = Pick<Action, 'type'>;

interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
}
interface OptionUpdate {
    width?: number;
    height?: number;
    color?: number;
    label?: number;
}
class UIWidget {
    constructor(init: Options) {
        /* .. */
    }
    update(options: OptionUpdate) {
        /* .. */
    }
}

type OptionUpdate = {[k in keyof Options]?: Options[k]};

const INIT_OPTIONS = {
    width: 640,
    height: 400,
    color: '#00FF00',
    label: 'VGA'
};

type Options = typeof INIT_OPTIONS;

function getUserInfo(userId: string) {
    // ...
    return {
        userId,
        name,
        age,
        height.
        weight,
        favoriteColor
    };
};
// 추론된 반환 타입은 {userId: string, name: string, age: number ...}

type userInfo = ReturnType<typeof getUserInfo>;

type userInfo = ReturnType<typeof getUserInfo>;
```

제너릭 타입에서 매개변수를 제한할 수 있는 방법은 extends를 사용하는 것이다.
```typescript
interface Name {
    first: string;
    last: string;
}
type DancingCuo<T extends Name> = [T, T];

const couple1: DancingDuo<Name> = [
    {first: "a", last: "b"},
    {first: "c", last: "d"}
]; //ok

const couple2: DancingDuo<first: string> = [
    {first: "s"},
    {first: "aa"}
]; // last 속성이 없으므로 오류