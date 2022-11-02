type TState = {
    name: string;
    capital: string;
}

interface IState {
    name: string;
    capital: string;
}

interface IState {
    population: number;
}
const wyoming: TState = {
    name: "name",
    capital: "capital",
    population: 10 //개체 리터럴은 알려진 속성만 지정할 수 있으며 'TState' 형식에 'population'이(가) 없습니다
}

const wyoming2: IState = {
    name: "name",
    capital: "capital",
    population: 10 //개체 리터럴은 알려진 속성만 지정할 수 있으며 'TState' 형식에 'population'이(가) 없습니다
}

type TDict = {[key: string]: string};
interface IDict {
    [key: string]: string
}

type TFn = (x: number) => string;
interface IFn {
    (x: number): string;
}

type TFnWithProperties = {
    (x: number): number;
    prop: string;
}

interface IFnWithProperties {
    (x: number): number;
    prop: string;
}

type TPair<T> = {
    first: T;
    second: T;
}

interface IPair<T> {
    first: T;
    second: T;
}

interface IStateWithPop extends TState {
    population: number;
}
type TStateWithPop = IState & {population: number};

class StateT implements TState {
    name: string = '';
    capital: string = '';
}

class StateI implements IState {
    name: string = '';
    capital: string = '';
}

type AorB = 'a' | 'b';

type Input = {/** */};
type Output = {/** */};
interface VariableMap {
    [name: string]: Input | Output;
}
type NamedVariable = (Input | Output) & {name: string};

type Pair = [number, number];
type StringList = string[];
type NamedNums = [string, ...number[]];

interface Tuple {
    0: number;
    1: number;
    length: 2;
}