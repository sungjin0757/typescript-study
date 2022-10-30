interface Person {
    name:string;
}

// const alice: Person = {name: 'Alice'};
// const bob = { name: 'bob'} as Person;

// const alice: Person = {}; // 'name' 속성이 '{}' 형식에 없지만 'Person' 형식에서 필수입니다.
// const bob = {} as Person; // 오류 없음

const alice: Person = {
    name: 'Alice',
    age: 12 //{ name: string; age: number; }' 형식은 'Person' 형식에 할당할 수 없습니다.
    //개체 리터럴은 알려진 속성만 지정할 수 있으며 'Person' 형식에 'age'이(가) 없습니다.
}

const bob = {
    name: "bob",
    age: 22
} as Person;

// const people = ['alice', 'bob', 'jan'].map(name => ({name}));

// const people = ['alice', 'bob', 'jan'].map(name => ({name} as Person));

const people = ['alice', 'bob', 'jan'].map((name): Person => ({name}));