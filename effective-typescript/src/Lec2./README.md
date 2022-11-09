# 2 장. 타입스크립트의 타입 시스템
타입스크립트는 코드를 자바스크립트로 변환하는 역할도 하지만 가장 중요한 역할은 타입시스템에 있다.
2 장에서는 타입 시스템의 기초부터 살펴본다.

## 🌈 Item6. 편집기를 사용하여 타입 시스템 탐색하기
타입스크립트를 설치하면, 다음 두 가지를 실행할 수 있다.
- 타입스크립트 컴파일러(tsc)
- 단독으로 실행할 수 있는 타입스크립트 서버(tsserver)

보통은 타입스크립트 컴파일러를 실행하는 것이 주된 목적이지만, 타입스크립트 서버 또한 '언어 서비스'를 
제공한다는 점에서 중요하다.

편집기는 코드를 빌드하고 타입 시스템을 익힐 수 있는 최고의 수단이다. 그리고 편집기는 타입스크립트가 언제 타입 추론을 수행할 수 있는지에 대한 개념을 잡게 해 주는데, 이 개념을 확실히 잡아야 간결하고 읽기 쉬운 코드를 작성할 수있다.

편집기마다 조금씩 다르지만 보통의 경우에는 심벌 위에 마우스 커서를 대면 타입스크립트가 그 타입을 어떻게 판단하고 있는지 확인할 수 있다.

![스크린샷 2022-10-21 오후 5 37 15](https://user-images.githubusercontent.com/56334761/197151951-496f367a-5ebb-4040-80b2-a435d4b69810.png)

num의 변수 타입을 지정하지 않았지만, 타입스크립트는 10이라는 값을 보고 그 타입을 알아낸다. 물론, 함수의 타입도 추론할 수 있따.

특정 시점에 타입스크립트가 값의 타입을 어떻게 이해하고 있는지 살펴보는 것은 타입 넓히기와 좁히기의 개념을 잡기 위해 꼭 필요한 과정이다.

![스크린샷 2022-10-21 오후 5 40 53](https://user-images.githubusercontent.com/56334761/197152764-936381db-0a0d-4bf8-94ce-5e2fc4c5dd80.png)

객체에서는 개별 속성을 살펴봄으로써 타입스크립트가 어떻게 각각의 속성을 추론하는지 살펴볼 수 있다.

![스크린샷 2022-10-21 오후 5 42 20](https://user-images.githubusercontent.com/56334761/197153058-f2cb2f68-88f4-44cd-bba3-a7c85e296dd4.png)

만약 x가 튜플 타입([number, number, number]) 이어야 한다면, 타입 구문을 명시해야 한다.

연산자 체인 중간의 추론된 제너릭 타입을 알고 싶다면, 메서드 이름을 조사하면 된다.

![스크린샷 2022-10-21 오후 5 46 45](https://user-images.githubusercontent.com/56334761/197154039-14c53c01-c147-4c92-8a58-08874d83a51b.png)

편집기 상의 타입 오류를 살펴 보는 것도 타입 시스템의 성향을 파악하는 데 좋은 방법이다. 예를 들어, 다음은 id 에 해당하거나 기본값인
`HTMLElement` 를 반환하는 함수다.

![스크린샷 2022-10-21 오후 5 49 01](https://user-images.githubusercontent.com/56334761/197154535-99e23192-7ffc-4079-9a54-bdefd0d8a2f5.png)

언어 서비스는 라이브러리와 라이브러리의 타입 선언을 탐색할 때 도움이 된다. 코드 내에서 `fetch` 함수가 호출되고, 이 함수를 더 알아보길 원한다고 가정하자. 편집기는 'Go to Definition' 옵션을 제공한다.

![스크린샷 2022-10-21 오후 5 51 36](https://user-images.githubusercontent.com/56334761/197155143-8fb15c0f-3dee-4aa8-8da9-3feae0b4b728.png)

이 옵션을 선택하면 타입스크립트에 포함된 DOM 타입 선언인 lob.dom.d.ts로 이동한다.

타입 선언은 처음에는 이해하기 어렵지만 타입스크립트가 무엇을 하는지, 어떻게 라이브러리가 모델링되었는지, 어떻게 오류를 찾아낼지 살펴볼 수 있는 훌륭한 수단이라는 것을 알 수 있다.

## 🌈 Item7. 타입이 값들의 집합이라고 생각하기
런타임에는 모든 변수는 자바스크립트 세상의 값으로부터 정해지는 각자의 고유한 값을 갖는다. 변수에는 다음처럼 다양한 종류의 값을 할당할 수 있다.

- 42
- null
- "Hello"
- undefined
- {first: "sungjin", last: "hong"}
- (x, y) => x + y

그러나 코드가 실행되기 전, 즉 타입스크립트가 오류를 체크하는 순간에는 타입을 가지고 있다.
할당 가능한 값들의 집합이 타입이라고 생각하면 된다. 이 집합은 타입의 범위라고 부르기도 한다.
예를들어, 모든 숫자값의 집합을 number 타입이라고 생각할 수 있다.

가장 작은 집합은 아무 값도 포함하지 않는 공집합이며, 타입스크립트에서는 never 타입이다. never 타입으로
선언된 변수의 범위는 공집합이기 때문에 아무런 값도 할당할 수 없다.

![스크린샷 2022-10-21 오후 5 58 58](https://user-images.githubusercontent.com/56334761/197156801-db622d29-1b39-4533-88a3-ca1ba4259618.png)

그 다음으로 작은 집합은 한 가지 값만 포함하는 타입이다. 이들은 타입스크립트에서 유닛 타입이라고 불리는 리터럴 타입이다.

```typescript
type A = 'A';
type B = 'B';
type Twelve = 12;
```

두 개 혹은 세 개로 묶으려면 유니온 타입을 사용한다.

```typescript
type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;
```

다양한 타입스크립트 오류에서 '할당 가능한'이라는 문구를 볼 수 있다. 이 문구는 집합의 관점에서, ~의 원소 또는
~의 부분 집합을 의미한다.

```typescript
const val1: AB = 'A'; // 정상
const val2: AB12 = 'C'; //"C"' 형식은 'AB12' 형식에 할당할 수 없습니다.
```

"C"는 유닛 타입이다. 범위는 단일 값 "C"로 구성되며, AB의 부분 집합이 아니므로 오류이다. 잡헙의 관점에서,
타입 체커의 주요 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것이다.

앞 코드의 타입들은 집합의 범위가 한정되어 있기 때문에 쉽게 이해할 수 있다. 그러나 실제 다루게 되는 타입은
대부분 범위가 무한대이므로 이해하기 훨씬 어려울 것이다.

```typescript
type Int = 1 | 2 | 3 | 4 | ...
```

또한 다음처럼 원소를 서술하는 방법도 있다.

```typescript
interface Identified {
    id: string;
}
```
앞의 인터페이스가 타입 범위 내의 값들에 대한 설명이라고 생각해보자. 어떤 객체가 string으로 할당 가능한 id 속성을
가지고 있다면 그 객체는 `Identified` 이다.

이러한 설명이 이번 아이템에서 말하고자 하는 전부이다. 구조적 타이핑 규칙들은 어떠한 값이 다른 속성도 가질수 있음을
의미한다. 심지어 함수 호출의 매개변수에서도 다른 속성을 가질 수 있다. 이러한 사실은 특정상황에서만 추가 속성을 허용하지 않는 잉여 속성 체크만 생각하다보면 간과하기 쉽다.

연산과 관련된 이해를 돕기 위해 값의 집합을 타입이라고 생각해보자.

```typescript
interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan;
```

& 연산자는 두 타입의 인터섹션을 계산한다. 언뜻 보기에 `Person` 과 `Lifespan` 인터페이스는 공통적으로 가지는 속성이 없기 때문에,
`PersonSpan` 타입을 공집합으로 예상하기 쉽다. 그러나 타입 연산자는 인터페이스의 속성이 아닌 값의 집합에 적용된다. 그리고 추가적인 속성을 가지는 값도 여전히 그 타입에 속한다. 그래서 `Person` 과 `Lifespan` 을 둘 다
가지는 값은 인터섹션 타입에 속한다.

```typescript
const ps: PersonSpan = {
    name: "hong",
    birth: new Date('1996/12/30'),
    death: new Date('2080/12/30')
}; // 정상
```

당연히 앞의 세 가지보다 더 많은 속성을 가지는 값도 `PersonSpan` 타입에 속한다. 인터섹션 타입의 값은 각 타입 내의 속성을 모두 포함하는 것이 일반적인 규칙이다.

규칙이 속성에 대한 인터섹션에 관해서는 맞지만, 두 인터페이스의 유니온에서는 그렇지 않다.
```typescript
type k = keyof (Person | LifeSpan); // never
```
앞의 유니온 타입에 속하는 키 값은 어떠한 키도 없기 때문에, 유니온에 대한 `keyof` 는 공집합이어야 한다.
조금 더 명확히 써보자면 다음과 같다.

```typescript
keyof (A & B) = (keyof A) | (keyof B);
keyof (A | B) = (keyof A) & (keyof B);
```

조금 더 일반적으로 `PersonSpan` 타입을 선언하는 방법은 `extends` 키워드를 쓰는 것이다.

```typescript
interface Person {
    name: string;
}

interface PersonSpan extends Person {
    birth: Date,
    death?: Date
}
```
타입이 집합이라는 관점에서 `extends`의 의미는 ~에 할당 가능한과 비슷하게 ~의 부분 집합이라는 의미로 받아들일 수 있다.

서브타입이라는 용어를 들어봤을 것이다. 어떤 집합이 다른 집합의 부분 집합이라는 의미이다. 예를 들어 1차원, 2차원, 3차원이 있다.

```typescript
interface Vector1D {
    x: number;
}

interface Vector2D extends Vector1D {
    y: number;
}

interface Vector3D extends Vector2D {
    z: number;
}
```

`extends` 없이 코드를 작성하면 다음과 같을 것입니다.

```typescript
interface Vector1D {
    x: number;
}

interface Vector2D {
    x: number;
    y: number;
}

interface Vector3D {
    x: number;
    y: number;
    z: number;
}
```
집합들은 바뀌지 않는 다는 것을 확인할 수 있다.

두 가지 스타일 모두 객체 타입에 대해서 잘 동작하지만, 리터럴 타입과 유니온 타입에 대해 생각해 본다면 집합 스타일이 훨씬 직관적이다.

```typescript
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
```

타입들이 엄격한 상속 관계가 아닐 때는 집합 스타일이 더욱 바람직하다. 예를 들어, string|number 와 string|Date 사이의 인터섹션은 공집합이 아니라 string이다. 이 타입들이 엄격한 상속 관계가 아니더라도 범위에 대한 관계는 명확하다.

타입이 집합이라는 관점은 배열과 튜플의 관계 역시 명확하게 만든다.

```typescript
const list = [1, 2];
const tuple: [number, number] = list; //number[]' 형식은 '[number, number]' 형식에 할당할 수 없습니다. 대상에 2개 요소가 필요하지만, 소스에 더 적게 있을 수 있습니다.
```

트리플은 구조적 타이핑의 관점으로 생각하면 쌍으로 할당 가능할 것으로 생각된다. 그렇다면 한번 확인해 보자.

```typescript
const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple; //'[number, number, number]' 형식은 '[number, number]' 형식에 할당할 수 없습니다.소스에 3개 요소가 있지만, 대상에서 2개만 허용합니다.
```

오류가 발생합니다. 타입스크립트는 숫자의 쌍을 {0: number, 1: number} 로 모델링하지 않고 {0: number, 1: number, length: 2} 로 모델링한다. 그래서 length의 값이 맞지 않기 때문에 할당문에 오류가 발생한다.

쌍에서 길이를 체크하는 것은 합리적이며, 이보다 나은 방법은 없을 것이다.

타입의 값의 집합이라는 건, 동일한 값의 집합을 가지는 두 타입은 같다는 의미가 된다. 두 타입이 의미적으로 다르고 우연히 같은 범위를 가진다고 하더라도, 같은 타입을 두 번 정의할 이유는 없다.

한편, 타입스크립트 타입이 되지 못하는 값의 집합들이 있다는 것을 기억해야한다. 가끔 `Exclude` 를 사용해서 일부 타입을 제외할 수는 있지만, 그 결과가 적절한 타입스크립트 타입일 때만 유효하다.

```typescript
type T = Exclude<string|Date, string|number>; // 타입은 Date
type NonZeroNums = Exclude<number, 0>; // 타입은 number
```

## Item 8. 타입 공간과 값 공간의 심벌 구분하기
타입스크립트의 심벌은 타입 공간이나 값 공간 중의 한곳에 존재한다.
심벌은 이름이 같더라도 속하는 공간에 따라 다른 것을 나타낼 수 있기 때문에 혼란 스러울 수 있다.

```typescript
interface Cylinder {
    radius: number;
    height: number;
}

const Cylinder = (radius: number, height: number) => ({radius, height});
```

인터페이스에서 Cylinder 는 타입으로 쓰이지만 const Cylinder 는 이름은 같아도 값으로 쓰이고, 서로 아무런 관련이 없다.
상황에 따라서 타입으로 쓰일 수도 있고 값으로도 쓰일 수 있기 때문에 가끔 오류를 야기한다.

```typescript
function calculateVolume(shape: unknown) {
    if (shape instanceof Cylinder) {
        shape.radius // '{}' 형식에 'radius' 속성이 없습니다.
    }
}
```
`instanceof` 는 자바스크립트의 런타임 연산자이고, 값에 대해서 연산을 한다. 그래서 타입이 아니라 함수를 참조한다.

따라서, 심벌이 타입인지 값인지 언뜻 봐서 알 수 없으므로 어떤 형태로 쓰였는지는 문맥을 살펴 알아내야 한다.

다음 리터럴을 예로 보자.

```typescript
type T1 = 'string literal';
type T2 = 123;
const v1 = 'string literal';
const v2 = 123;
```
일반적으로 type이나 interface 다음에 나오는 심벌은 타입인 반면, const나 let 선언에 쓰이는 것은 값이다.

두 공간에 대한 개념을 잡으려면 타입스크립트 플레이그라운드를 활용하면 된다.

<img width="1440" alt="스크린샷 2022-10-26 오후 10 53 00" src="https://user-images.githubusercontent.com/56334761/198044825-a8fc9a2e-7395-4ce7-847d-89a114cf10a5.png">

위의 그림에서 보이는 것 처럼 타입스크립트 소스로부터 변환된 자바스크립트 결과물을 보여 준다.
심벌이 사라진다면 타입을 의미하는 것이다.

타입스크립트 코드에서 타입과 값은 번갈아 나올 수 있다. 타입선언 또는 단언문 다음에 나오는 심벌은 타입인 반면, = 다음에 나오는 모든 것은 값이다.
예를들어, 다음 코드를 보자.

```typescript
const p:Person = {first: "Sungjin", last: "Hong"};

function email(p: Person, subject: string, body: string): Response{
    
}
```

`class` 와 `enum` 은 상황에 따라 타입과 값 두 가지 모두 가능한 예약어이다.

```typescript
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
```

클래스가 타입으로 쓰일 때는 형태(속성과 메서드)가 사용되는 반면, 값으로 쓰일 때는 생성자가 사용된다.

```typescript
type T1 = typeof p;
type T2 = typeof email;
    // 타입은 email(p: Person, subject: string, body: string): Response

const v1 = typeof p; // object
const v2 = typeof email; // function
```

타입의 관점에서, `typeof` 는 값을 읽어서 타입스크립트 타입을 반환한다. 타입 공간의 `typeof`는 보다 큰 타입의 일부분으로 사용할 수 있고, `type` 구문으로 이름을 붙이는 용도로도 사용할 수 있다.
값의 관점에서 `typeof`는 자바스크립트 런타임의 `typeof` 연산자가 된다. 값 공간의 `typeof`는 대상 심벌의 런타임 타입을 가리키는 문자열을 반환하며, 타입스크립트 타입과는 다르다.

```typescript
const v = typeof Cylinder; // 값이 function
type T = typeof Cylinder; // 타입이 typeof Cylinder
```
클래스가 자바스크립트에서는 실제 함수로 구현되기 때문에 첫 번째 줄의 값은 `function` 이 된다.
두 번째 줄의 타입은 무슨의미인지 감이 오지 않을 것이다. 여기서 중요한 것은 `Cylinder` 가 인스턴스의 타입이 아니라는 점이다.
실제로는 `new` 키워드를 사용할 때 볼 수 있는 생성자 함수이다.

```typescript
declare let fn: T;
const c = new fn(); // 타입이 cylinder
```

다음 코드처럼 `InstanceType` 제네릭을 사용해 생성자 타입과 인스턴스 타입을 전환할 수 있다.
```typescript
type C = InstanceType<typeof Cylinder>;
```

속성 접근자인 [] 는 타입으로 쓰일 때에도 동일하게 동작한다. 그러나 `obj['field]` 와 `obj.field` 는 값이 동일하더라도 타입은 다를 수 있다.
따라서 타입의 속성을 얻을 때에는 반드시 첫 번째 방법을 사용해야한다.

```typescript
const first: Person['first'] = p['first'];
```

```typescript

type PersonEl = Person['first' | 'last']; // 타입은 string
type Tuple = [string, number, Date];
type TupleEl = Tuple[number]; // 타입은 string | number | Date
```

두 공산 사이에서 다른 의미를 가지는 코드 패턴들이 있다.
- 값으로 쓰이는 this는 자바스크립트의 this 키워드다. 타입으로 쓰이는 this는, 다형성 this라고 불리는 this의 타입스크립트 타입이다.
- 값에서 & 와 | 는 And 와 Or 비트연산이다. 타입에서는 인터섹션과 유니온이다.
- const 는 새 변수를 선언하지만, as const는 리터럴 또는 리터럴 표현식의 추론된 타입을 바꾼다.
- extends 는 서브클래스 또는 서브타입 또는 제너릭 타입의 한정자를 정의할 수 있다.
- in은 루프 또는 매핑된 타입에 등장한다.

타입스크립트 코드가 잘 동작하지 않는다면 타입 공간과 값 공간을 혼동해서 잘못 작성했을 가능성이 크다.
예를들어 `email` 함수의 매개변수를 단일 객체로 바꿨다고 하자.

```typescript
function email({p: Person, subject: string, body: string}): Response{

}
```
모든 타입이 any 형식이 있다고 반응을 합니다.

값의 관점에서 Person 과 string이 해석되었기 때문에 오류가 발생한다.
Person이라는 변수명과 string  이라는 이름을 가지는 두 개의 변수를 생성하려 한 것이다.
문제를 해결하려면 타입과 값을 구분해야 한다.
```typescript
function email({person, subject, body}: {person: Person, subject: string, body: string}) {

}
```
이 코드는 장황하긴 하지만, 매개변수에 명명된 타입을 사용하거나 문맥에서 추론되도록 잘 동작한다.

## Item 9. 타입 단언보다는 타입 선언을 사용하기
타입스크립트에서 변수에 값을 할당하고 타입을 부여하는 방법은 두가지다.

```typescript
interface Person {
    name:string;
}

const alice: Person = {name: 'Alice'};
const bob = { name: 'bob'} as Person;
```

위의 두 방법은 각자 타입 선언과 타입 단언이다.
타입 단언보다 타입 선언을 사용하는 것이 좋다. 그 이유는 코드에서 확인할 수 있다.
```typescript
const alice: Person = {}; // 'name' 속성이 '{}' 형식에 없지만 'Person' 형식에서 필수입니다.
const bob = {} as Person; // 오류 없음
```

타입 선언은 할당되는 값이 해당 인터페이스를 만족하는지 검사한다. 앞의 예제에서는 그러지 못했기 때문에 오류를 표시한다. 타입 단언은 강제로 타입을 지정했으니 타입 체커에게 오류를 무시하라고 하는 것이다.

타입 선언과 타입 단언의 차이는 속성을 추가할 때도 마찬가지다.

```typescript
const alice: Person = {
    name: 'Alice',
    age: 12 //{ name: string; age: number; }' 형식은 'Person' 형식에 할당할 수 없습니다.
    //개체 리터럴은 알려진 속성만 지정할 수 있으며 'Person' 형식에 'age'이(가) 없습니다.
}

const bob = {
    name: "bob",
    age: 22
} as Person;
```
타입 선언문에서는 잉여 속성 체크가 동작했지만, 단언문에서는 적용되지 않는다.
단언이 꼭 필요한 경우가 아니라면, 안전성 체크도 되는 선언을 사용하는 것이 좋다.

화살표 함수의 타입 선언은 추론된 타입이 모호할 때가 있다. 예를 들어, 다음 코드에서 Person 인터페이스를 사용하고 싶다고 가정하자.

```typescript
const people = ['alice', 'bob', 'jan'].map(name => ({name})); 
// Person[] 을 원했지만 결과는 {name: string} []
```

타입 단언을 사용하면,

```typescript
const people = ['alice', 'bob', 'jan'].map(name => ({name} as Person));
```
문제가 해결 된 것처럼 보일 수 있지만, 이 또한 런타임 에러를 일으킬 수 있다.

```typescript
const people = ['alice', 'bob', 'jan'].map(name => ({} as Person));
```

단언문을 쓰지 않고, 다음과 같이 화살표 함수 안에서 타입과 함께 변수를 선언하는 것이 가장 직관적이다.

```typescript
const people = ['alice', 'bob', 'jan'].map(name => {
    const person: Person = {name};
    return person;
});
```

기존 코드에 비해 꽤나 번잡해 보일 수 있습니다. 이를 다음과 같이 바꿀 수 있습니다.
```typescript
const people = ['alice', 'bob', 'jan'].map((name): Person => ({name}));
```

여기서 소괄호는 매우 중요한 의미를 지닌다. `(name): Person` 은 name의 타입이 없고, 반환 타입이 `Person` 이라고 명시한다. 그러나 `(name: Person)` 은 `name`의 타입이 `Person` 임을 명시하고 반환 타입이 없기 때문에 오류가 발생한다.

타입 단언이 꼭 필요한 경우도 있다. 타입 단언은 타입체커가 추론한 타입보다 우리가
판단하는 타입이 더 정확할 때 의미가 있다.

또한, 자주 쓰이는 특별한 문법(!)을 사용해서 `null`이 아님을 단언하는 경우도 있다.
접두사가 아닌 접미사로 쓰인 `!` 는 boolean이 아닌 null이 아님을 단언한다는 의미이다.

## Item 10. 객체 래퍼 타입 피하기
자바스크립트에는 객체 이외에도 기본형 값들에 대한 일곱 가지 타입이 있다.
기본형들은 불변이며 메서드를 가지지 않는다는 점에서 객체와 구분된다. 그런데 기본형인 `string` 의 경우 메서드를 가지고 있는 것처럼 보인다.

```typescript
'primitive'.charAt(3);
```
하지만 사실 `charAt`은 `string`의 메서드가 아니며, `string` 을 사용할 때
자바스크립트 내부적으로 많은 동작이 일어난다. `string` 기본형에는 메서드가 없지만, 자바스크립트는 메서드를 가지는 `String` 객체 타입이 정의되어있다.
자바스크립트는 기본형과 객체형을 자유롭게 변환한다.
`string` 기본형에 `charAt` 같은 메서드를 사용할 때, 자바스크립트는 기본형을 객체로 매핑하고, 메서드를 호출하고, 마지막에 래핑한 객체를 버린다.

```typescript
const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function(pos) {
    console.log(this, typeof this, pos);
    return originalCharAt.call(this, pos);
}
console.log('primitive'.charAt(3)); // [String: 'primitive'] 'object' 3
```

메서드 내의 this는 객체 래퍼이다. 객체를 직접 생성할 수도 있으며, 기본형처럼 동작한다.
그러나 기본형과 객체 래퍼가 항상 동일하게 동작하는 것은 아니다. 예를 들어, 객체는 오직 자신하고만 동일하다.

```typescript
"hello" === new String("hello"); // false
new String("hello") === new String("hello"); //false
```

객체 래퍼 타입의 자동 변환은 종종 당황스러운 동작을 보일 때가 있다. 예를 들어 어떤 속성을 기본형에 할당한다면 그 속성이 사라진다.

```typescript
var x = "hello";
x.language = 'English'
x.language; // false
```
실제로는 x가 String 객체로 변환된 후 language 속성이 추가되었고, 속성이 추가된 객체는 버려진 것이다.

다른 기본형에도 동일하게 객체 래퍼 타입이 존재한다.
이 래퍼 타입들 덕분에 기본형 값에 메서드를 사용할 수 있고, 정적 메서드도 사용할 수 있다. 그러나 보통은 래퍼 객체를 직접 생성할 필요가 없다.

타입스크립트는 기본형과 객체 래퍼 타입을 별도로 모델링한다.
- string, String
- number, Number
- boolean, Boolean
- symbol, Symbol
- bigint, BigInt

`string`을 사용할 때는 특히 조심하자. 자바 같은 경우는 `String` 으로 명시되어 있기 때문이다. 또한, 일단은 정상작동 할 수도 있기 때문이다.

```typescript
function getStringLen(foo: String) {
    return foo.length;
}

getStringLen("hello"); //정상
getStringLen(new String("hello")); //정상

function isGreeting(phrase: String) {
    return [
        'hello',
        'good day'
    ].includes(phrase); //'String' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
    // string'은(는) 기본 개체이지만 'String'은(는) 래퍼 개체입니다. 가능한 경우 'string'을(를) 사용하세요.
    
}
```

기본형은 객체에 할당할 수 있지만, 객체에는 기본형을 할당할 수 없다.
대부분의 라이브러리와 마찬가지로 타입스크립트가 제공하는 타입 선언은 전부 기본형 타입으로 되어 있다.

래퍼 객체는 타입 구문의 첫 글자를 대문자로 표기하는 방법으로도 사용할 수 있다.
```typescript
cons s: String = "primitive";
```
당연히 런타입의 값은 객체가 아니고 기본형이다. 그러나 기본형 타입은 객체 래퍼에 할당할 수 있기 때문에 타입스크립트는 기본형 타입을 객체 래퍼에 할당하는 선언을 허용한다.
그러나 기본형 타입을 객체 래퍼에 할당하는 구문은 오해하기 쉽고, 굳이 그렇게 할 필요도 없다. 
그냥 기본형을 사용하는 것이 낫다.
그런데 `new` 없이 객체 `Symbol` 을 호출하는 경우는 기본형을 생성하기 때문에 사용해도 좋다.
```typescript
typeof BigInt(25); // "bigint"
```
이들은 타입스크립트 타입은 아니다. 앞 예제의 결과는 bigint 타입의 값이 된다.

## Item 11. 잉여 속성 체크의 한계 인지하기
타입이 명시괸 변수에 객체 리터럴을 할당할 때 타입스크립트는 해당 타입의 속성이 있는지, 그리고 그외의 속성은 없는지 확인한다.

```typescript
interface Room {
    numDoors: number;
    ceilingHeightFt: number;
}
const r: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present'  //개체 리터럴은 알려진 속성만 지정할 수 있으며 'Room' 형식에 'elephant'이(가) 없습니다.
}
```

구조적 타이핑 관점으로 생각해 보면 오류가 발생하지 않아야한다. 임시 변수를 도입해 보면 알 수 있는데, obj 객체는 `Room` 타입에 할당이 가능하다.

```typescript
const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present'
};
const r: Room = obj; //정상
```

obj의 타입은 `{numDoors: number, ceilingHeightFt: number, elephant: string}` 으로 추론된다. obj 타입은 Room 타입의 부분 집합을 포함하므로, Room 에 할당 가능하며 타입 체커도 통과한다.

앞의 두 예제의 차이점을 보자. 첫 번째 예제에서는, 구조적 타입 시스템에서 발생할 수 있는 중요한 종류의 오류를 잡을 수 있도록 잉여 속성 체크 과정이 수행되었다.
그러나 잉여 속성 체크 역시 조건에 따라 동작하지 않는다는 한계가 있고, 구조적 타이핑과 혼란스러울 수 있다.
잉여 속성 체크가 할당 가능 검사와는 별도의 과정이라는 것을 알아야 타입스크립트 타입 시스템에 대한 개념을 잡을 수 있다.

타입스크립트는 단순히 런타임에 예외를 던지는 코드에 오류를 표시하는 것 뿐 아니라, 의도와 다르게 작성된 코드까지 찾으려 한다.

```typescript
interface Options {
    title: string,
    darkMode?: boolean
}

function createWindow(options: Options) {
    if(options.darkMode) {
        setDarkMode();
    }
}
createWindow({
    title: 'Spider Solitaire',
    darkmode: true //개체 리터럴은 알려진 속성만 지정할 수 있지만 'Options' 형식에 'darkmode'이(가) 없습니다. 'darkMode'을(를) 쓰려고 했습니까?
})
```

앞의 코드를 실행하면 런타임에 어떠한 종류의 오류도 발생하지 않는다. 그러나 타입스크립트가 알려주는 오류 메시지처럼 의도한 대로 동작하지 않을 수 있다.

Options 타입은 범위가 매우 넓기 때문에, 순수한 구조적 타입 체커는 이런 종류의 오류를 찾아내지 못한다. string 타입은 title 속성과 또다른 어떤 속성을 가지는 모든 객체는 Options 타입의 범위에 속하게 된다. 
즉, 범위가 아주 넓어질 수 있다.
```typescript
const o1: Options = document; //정상
```

document의 인스턴스가 string 타입인 title속성을 가지고 있기 때문에 할당문은 정상이다.

잉여 속성 체크를 이용하면 기본적으로 타입 시스템의 구조적 본질을 해치지 않으면서 객체 리터럴에 알 수 없는 속성을 허용하지 않음으로, 앞에서 다룬 Room이나 Options와 같은 문제점을 방지할 수 있다.

document는 객체 리터럴이 아니기 때문에 잉여 속성 체크가 되지 않는다. 그러나 
`{title, darkmode}` 객체는 체크가 된다.
```typescript
const o: Options = {title: "title", darkmode: true}; //개체 리터럴은 알려진 속성만 지정할 수 있지만 'Options' 형식에 'darkmode'이(가) 없습니다.
```

오류가 사라지는 이유를 알아내기 위해 타입 구문 없는 임시 변수를 사용해 보자.

```typescript
const intermediate = {
    darkmode: true,
    title: "title"
}

const obj2: Options = intermediate;
```

첫 번째 줄의 오른쪽은 객체 리터럴이지만, 두 번째 줄의 오른쪽은 객체 리터럴이 아니다.
따라서 잉여 속성 체크가 적용되지 않고 오류는 사라진다.
잉여 속성 체크는 타입 단언문을 사용할 때에도 적용되지 않는다.
```typescript
const o = {
    darkmode: true,
    title: "title"
} as Options // 정상
```

이 예제가 단언문보다 선언문을 사용해야하는 단적인 이유 중 하나다.
잉여 속성 체크를 원치 않는다면, 인덱스 시그니처를 사용해서 타입스크립트가 추가적인 속성을 예상하도록 할 수 있다.

```typescript
interface Options {
    darkMode?: boolean;
    [otherOptions: string]: unknown;
}
const o: Options = {darkMode: true}; // 정상
```
이런 방법이 데이터 모델링하는데 적적한지는 아이템 15에서 다룬다.

선택적 속성만 가지는 약한 타입에도 비슷한 체크가 동작한다.

```typescript
const opts = {logScale: true};
const oo: LineChartOptions = opts;  // '{ logScale: boolean; }' 유형에 'LineChartOptions' 유형과 공통적인 속성이 없습니다.
```
구조적 관점에서 모든 속성이 선택적이므로 모든 객체를 포함할 수 있다. 이런 약한 타입에 대해서 타입스크립트는 값 타입과 선언 타입에 공통된 속성이 있는지 확인하는 
별도의 체크를 수행한다.
공통 속성 체크는 잉여 속성 체크와 마찬가지로 오타를 잡는 데 효과적이며 구조적으로 엄격하지 않다.
그러나 잉여 속성 체크와 다르게, 약한 타입과 관련된 할당문 마다 수행된다.

잉여 속성 체크는 구조적 타이핑 시스템에서 허용되는 속성 이름의 오타같은 실수를 잡는 데 효과적이다.
선택적 필드를 포함하는 타입에도 유용하다.
하지만, 적용 범위도 매우 제한적이며 오직 객체 리터럴에만 적용된다. 이러한 한계점을 인지하고 타입 체크를 구분한다면, 개념을 잡는데에 도움될 것이다.

잉여 속성 체크가 어떻게 버그를 잡고 새로운 설계 가능성을 보여주는지에 대한 구체적인 예제는 18장에서 다룬다.
또한 임시 상수를 도입함으로써 잉여 속성 체크 문제를 해결하지만, 문맥 관점의 오류를 발생시키는 예제는 26장에서 다룬다.

## Item 12. 함수 표현식에 타입 적용하기
자바스크립트에서는 함수 문장과 함수 표현식을 다르게 인식한다.

```typescript
function rollDice1(sides: number): number {
    /* ... */  // 문장
}

const rollDice2 = function(sides: nubmer): number {/* ... */}; // 표현식
const rollDice3 = (sides: number): number{/* ... */}; // 표현식
```
타입스크립트에서는 함수 표현식을 하용하는 것이 좋다.
함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있다는 장점이 있기 때문이다.

함수 타입 선언의 장점을 더 알아보자.
함수 타입의 선언은 불필요한 코드의 반복을 줄인다. 사칙연산을 하는 함수 네 개는 다음과 같이 작성할 수 있다.

```typescript
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
```

반복되는 함수 시그니처를 하나의 함수 타입으로 통합할 수도 있다.
```typescript
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```

이 예제는 함수 타입 선언을 이용했던 예제보다 타입 구문이 적다. 함수 구현부도 분리되어 있어 로직이 보다 분명해진다. 모든 함수 표현식의 반환 타입 까지 number 로 선언한 셈이다.

라이브러리는 공통 함수 시그니처를 타입으로 제공하기도 한다. 예를들어, 리액트는 함수의 매개변수에 명시하는 `MouseEvent` 타입 대신에 함수 전체에 적용할 수 있는
`MouseEventHandler` 타입을 제공한다.

시그니처가 일치하는 다른 함수가 있을 때도 함수 표현식에 타입을 적용해볼 만 하다.
예를 들어, 웹브라우저에서 `fetch` 함수는 특정 리소스에 HTTP 요청을 보낸다.
```typescript
const responseP = fetch('url');
```

그리고 형식에 맞춰 응답을 가져온다.
```typescript
async function getQuote() {
    const response = await fetch('url');
    const quote = response.json();
    return quote;
}
```
여기애 버그가 존재한다. 만약 url이 존재하지 않는 경로라면 에러가 포함된 내용을 응답하고, json 형식이 아닐 수 있다. 호출한 곳에서는 새로운 오류 메시지가 전달 되어 실제 오류가 감춰질 것이다.
또한 `fetch` 가 실패하면 거절된 프로미스를 응답하지는 않는다는 걸 간과하기 쉽다.
그러니 상태를 체크해줄 함수를 작성해보자.
```typescript
declare function fetch {
    input: RequestInfo,
    Init?: RequestInit
}: Promise<Response>;

async function checkedFetch(input: RequestInfo, Init?: RequestInit) {
    const response = await fetch('url');
    if(!response.ok) {
        throw new Error(`Request Failed : %{response.status}`);
    }
    return response;
}
```

이 코드도 잘 동작하지만 다음처럼 더 간결하게 만들 수도 있다.
```typescript
const checkedFetch: typeof fetch = async (input, init) => {
    const response = await fetch('url');
    if(!response.ok) {
        throw new Error(`Request Failed : %{response.status}`);
    }
    return response;
}
```
함수 문장을 함수 표현식으로 바꿨고 함수 전체에 타입을 적용했다. 이는 타입스크립트가 input 과 init의 타입을 추론할 수 있게 해준다.

타입 구문은 또한 반환타입을 보장하며, fetch 와 동일하다. 예를들어 throw 대신 
return 을 사용했다면, 타입스크립트는 그 실수를 잡아낸다.

함수의 매개변수에 타입 선언을 하는 것보다 함수 표현식 전체 타입을 정의하는 것이 코드도 간결하고 안전하다. 다른 함수의 시그니처와 동일한 타입을 가지는 새 함수를 작성하거나, 동일한 타입 시그니처를 가지는 여러개의 함수를 작성할 때는 매개변수의 타입과 반환 타입을 반복해서 작성하지 말고 함수 전체의 타입 선언을 적용해야 한다.

## Item 13. 타입과 인터페이스의 차이점 알기
타입스크립트에서 명명된 타입을 정의하는 방법은 두 가지가 있다.

```typescript
type TState = {
    name: string;
    capital: string;
}

interface IState {
    name: string;
    capital: string;
}
``` 
대부분의 경우에는 타입을 사용해도 되고 인터페이스를 사용해도 된다.
그러나 타입과 인터페이스 사이에 존재하는 차이를 분명하게 알고, 같은 상황에서는 동일한 방법으로 명명된 타입을 정의해 일관성을 유지해야 한다.

먼저, 인터페이스 선언과 타입 선언의 비슷한 점에 대해 알아보자. 명명된 타입은 인터페이스로 정의하는 타입으로 정의하든 상태에는 차이가 없다. 만약 `Istate` 와 `TState` 를 추가 속성과 함께 할당한다면 동일한 오류가 발생한다.

```typescript
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
```

인덱스 시그니처는 인터페이스와 타입에서 모두 사용할 수 있다.
```typescript
type TDict = {[key: string]: string};
interface IDict {
    [key: string]: string

```

또한 함수 타입도 인터페이스나 타입으로 정의할 수 있다.
```typescript
type TDict = {[key: string]: string};
interface IDict {
    [key: string]: string

```

이런 단순한 함수 타입에는 타입 별칭이 더 나은 선택이 되겠지만, 함수 타입에 추가적인 속성이 있다면 타입이나 인터페이스 어떤 것을 선택하든 차이가 없다.

```typescript
type TFnWithProperties = {
    (x: number): number;
    prop: string;
}

interface IFnWithProperties {
    (x: number): number;
    prop: string;
}
```
문법이 생소할 수도 있지만 자바스크립트에서 함수는 호출 가능한 객체라는 것을 떠올려 보면 납득할 수 있는 코드다.
타입 별칭과 인터페이스는 모두 제너릭이 가능하다.

```typescript
type TPair<T> = {
    first: T;
    second: T;
}

interface IPair<T> {
    first: T;
    second: T;
}
```
인터페이스는 타입을 확장할 수 있으며, 타입은 인터페이스를 확장할 수 있다.

```typescript
interface IStateWithPop extends TState {
    population: number;
}
type TStateWithPop = IState & {population: number};
```
위의 둘의 코드는 동일하다. 여기서 주의할 점은 인터페이스는 유니온 타입 같은 복잡한 타입을 확장하지는 못한다는 것이다. 복잡한 타입을 확장하고 싶다면 타입과 & 를 사용해야 한다.

클래스를 구현할 때는, 타입과 인터페이스를 둘 다 사용할 수 있다.
```typescript

class StateT implements TState {
    name: string = '';
    capital: string = '';
}
class StateI implements IState {
    name: string = '';
    capital: string = '';
}
```
지금까지 타입과 인터페이스의 비슷한 점을 살펴보았다. 이제부터는 다른 점을 알아보자.

유니온 타입은 있지만 유니온 인터페이스라는 개념은 없다.
```typescript
type AorB = 'a' | 'b';
```
인터페이스는 타입을 확장할 수 있지만, 유니온은 할 수 없다.
그런데 유니온 타입을 확장하는 게 필요할 때도 있다.

```typescript
type Input = {/** */};
type Output = {/** */};
interface VariableMap {
    [name: string]: Input | Output;
}
```
또는 유니온 타입에 name 속성을 붙인 타입을 만들 수도 있다.
```typescript
type NamedVariable = (Input | Output) & {name: string};
```
이 타입은 인터페이스로 표현할 수 없다. tpye 키워드는 일반적으로 interface 보다 쓰임새가 많다.
type은 유니온이 될 수도 있고, 매핑된 타입 또는 조건부 타입 같은 고급 기능에 활용할 수도 있다.
튜플과 배열타입도 type을 활용해 더 간결하게 표현할 수 있다.

```typescript
type Pair = [number, number];
type StringList = string[];
type NamedNums = [string, ...number[]];
```
인터페이스도 튜플과 비슷하게 구현할 수 있기는 하다.

```typescript
interface Tuple {
    0: number;
    1: number;
    length: 2;
}
```
그러나 인터페이스로 튜플과 비슷하게 구현하면 튜플에서 사용할 수 있는 concat 같은 메서드들을 사용할 수 없다.
그러므로 튜플은 type 키워드로 구현하는 것이 낫다.

반면, 인터페이스는 타입에 없는 몇 가지 기능이 있다. 그 중 하나는 바로 보강이 가능하다는 것이다.

```typescript
interface IState {
    name: string;
    capital: string;
}

interface IState {
    population: number;
}

const wyoming2: IState = {
    name: "name",
    capital: "capital",
    population: 10 //정상
}
```
이 예제처럼 속성을 확장하는 것을 선언 병합이라고 한다.

타입 선언 파일을 작성할 때는 선언 병합을 지원하기 위해 반드시 인터페이스를 사용해야 하며 표준을 따라야 한다. 타입 선언에는 사용자가 채워야 하는 빈틈이 있을 수 있는데, 바로 이 선언 병합이 그렇다.

타입스크립트는 여러 버전의 자바스크립트 표준 라이브러리에서 여러 타입을 모아 병합한다.

병합은 선언처럼 일반적인 코드라서 언제든지 가능하다는 것을 알고 있어야한다. 그러므로 프로퍼티가 추가되는 것을 원하기 않는다면 인터페이스 대신 타입을 사용해야 한다.

타입과 인터페이스 중 어떤 것을 사용해야 하는지는 다음과 같다.
- 복잡한 타입이면 타입 별칭을 사용해야한다.
- 간단한 타입이면 보강의 관점에서 고려해 봐야한다. 일관된 타입을 고르면 된다.
- 아직 스타일이 확립되지 않은 프로젝트라면, 향후에 보강의 가능성이 있는지 확인해 봐야 한다. 
  - API 에 대한 타입 선언을 작성해야 한다면 인터페이스.
  - 프로젝트 내부적으로 사용되는 타입에 선언 병합은 잘못된 설계이므로 타입을 사용해야한다.
  - 

## Item 14. 타입 연산과 제너릭 사용으로 반복 줄이기
다음은 원기둥의 반지름과 높이, 표면적, 부피를 출력하는 코드다.

```typescript
console.log('Cylinder 1 X 1',
'Surface area : ', 6.283185 * 1 * 1 + 6.283185 * 1 * 1,
'Volume : ', 3.14159 * 1 * 1);

console.log('Cylinder 1 X 2',
'Surface area : ', 6.283185 * 1 * 1 + 6.283185 * 2 * 1,
'Volume : ', 3.14159 * 2 * 1);
```
비슷한 코드가 반복되어 있어 보기 불편하다. 값과 상수가 반복되는 바람에 드러나지 않은 오류까지 가지고 있다.

이 코드에서 함수, 상수, 루프의 반복을 제거해 코드를 개선해 보자.

```typescript
const surfaceArea = (r, h) => 2 * Math.PI * r * (r + h);
const volume = (r, h) => Math.PI * r * r * h;
for (const [r, h] of [[1, 1], [1, 2], [2, 1]]) {
    console.log(
        `Cylinder ${r} * ${h}`,
        `Surface area : ${surfaceArea(r, h)}`,
        `Volume : ${volume(r, h)}`
    )
}
```

이게 바로 같은 코드를 반복하지 말라는 DRY(don't repeat yourself) 원칙이다.

반복된 코드를 열심히 제거하며 DRY 원칙을 지켜왔던 개발자라도 타입에 대해서는 간과했을지 모른다.

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate {
    firstName: string;
    lastName: string;
    birth: Date;
}
```

타입 중복은 코드 중복만큼 많은 문제를 발생시킨다. 예를 들어 선택적 필드인
middleName 을 Person에 추가해본다고 하자.
그러면 Person과 PersonWithBirthDate 는 다른 타입이 된다.

타입에서 중복이 더 흔한 이유 중 하나는 공유된 패턴을 제거하는 메커니즘이 기존 코드에서 하던 것과 비교해 덜 익숙하기 때문이다.

타입간에 매핑하는 방법을 익히면, 타입 정의에서도 DRY 의 장점을 적용할 수 있다.

반복을 줄이는 가장 간단한 방법은 타입에 이름을 붙이는 것이다.

```typescript

function distance(a: {x: number, y: number}, b: {x:number, y: number}) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
```

위와 같은 코드가 있다. 코드를 수정해 타입에 이름을 붙여보자.

```typescript
function distanceV2(a: Point2D, b: Point2D) {
    /* .. */
}
```

이 코드는 상수를 사용해서 반복을 줄이는 기법을 동아ㅣㄹ하게 타입 시스템에 적용한 것이다.

중복된 타입은 종종 문법에 의해서 가려지기도 한다. 예를 들어, 몇몇 함수가 같은 타입 시그니처를 공유하고 있다고 해 보자.

```typescript
function get(url: string, opts: Options): Promise<Response> {
/* .. */
}
function post(url: string, opts: Options): Promise<Response> {
    /* .. */
}
```

그러면 해당 시그니처를 명명된 타입으로 분리할 수 있다.

```typescript
type HttpFunction = (url: string, opts: OPtions) => Promise<Response>;
const get: HttpFunction = (url, opts) => {/* .. */};
const post: HttpFunction = (url, opts) => {/* .. */};
```

Person/PersonWithBirthDate 예제에서는 한 인터페이스가 다른 인터페이스를 확장하게 해서 반복을 제거할 수 있다.

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate extends Person {
    birth: Date;
}
```

이제 추가적인 필드만 작성하면 된다. 만약 두 인터페이스가 필드의 부분 집합을 공유한다면, 공통 필드만 골라서 기반 클래스로 분리해낼 수 있다.

이미 존재하는 타입을 확장하는 경우에 인터섹션 연산자를 사용할 수 있다.
```typescript
type PersonWithBirthDate = Person & {birth: Date};
```

이제 다른 측면을 생각해 보자. 전체 애플리케이션의 상태를 표현하는 State 타입과 단지 부분만 표현하는 TopNavState 가 있는 경우를 살펴보자.

```typescript
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
```

TopNavState 를 확장하여 State를 구성하기보다, State의 부분 집합으로 TopNavState를 정의하는 것이 밯람직해 보인다.

State를 인덱싱하여 속성의 타입에서 중복을 제거할 수 있다.

```typescript
type TopNavState = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
}
```

중복 제거는 아직 끝나지 않았다. State 내의 pageTitle의 타입이 바뀌면 TopNavState에도 반영된다.
그러나 여전히 반복되는 코드가 존재한다. 이때, 매핑된 타입을 사용하면 좀 더 나아진다.

```typescript
type TopNavState = {
    [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
}
```

매핑된 타입은 배열의 필드를 루프 도는 것과 같은 방식이다. 이 패턴은 표준 라이브러리에서도 일반적으로 찾을 수 있으며, Pick 이라고 한다.

```typescript
type Pick<T, K> = {[K in K] : T[K]};
```

정의가 완전하지는 않지만 다음과 같이 사용할 수 있다.

```typescript
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;
```

여기서 Pick은 제너릭 타입이다. 중복된 코드를 없앤다는 관점으로, Pick을 사용하는 것은 함수를 호출하는 것에 비유할 수 있다.
마치 함수에서 두 개의 매개변수 값을 받아서 결괏값을 반화하는 것처럼, Pick 은 T 와 K 두 가지 타입을 받아서 결과 타입을 반환한다.

태그된 유니온에서도 다른 형태의 중복이 발생할 수 있다. 그런데 단순히 태그를 붙이기 위해서 타입을 사용한다면 어떨지 생각해보자.

```typescript
interface SaveAction {
    type: 'save';
}

interface LoadAction {
    type: 'load';
}
type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load';
```

Action 유니온을 인덱싱하면 타입 반복 없이 ActionType을 정의할 수 있다.

```typescript
type ActionType = Action['type'];
```

Action 유니온에 타입을 더 추가하면 ActionType은 자동적으로 그 타입을 포함한다.
ActionType은 Pick을 사용하여 얻게 되는, type 속성을 가지는 인터페이스와는 다르다.

```typescript
type ActionRec = Pick<Action, 'type'>;
```
한편 생성하고 난 다음에 업데이트가 되는 클래스를 정의한다면, update 메서드 매개변수의 타입은 생성자와 동일한 매개변수이면서, 타입 대부분이 선택적 필드가 되게 된다.

```typescript
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
```
매핑된 타입과 keyof를 사용하면 Options으로 부터 OptionsUpdate를 만들수 있다.

```typescript
type OptionUpdate = {[k in keyof Options]?: Options[k]};
```

값의 형태에 해당하는 타입을 정의하고 싶을 때도 있다.

```typescript
const INIT_OPTIONS = {
    width: 640,
    height: 400,
    color: '#00FF00',
    label: 'VGA'
};

type Options = typeof INIT_OPTIONS;
```
이 코드는 자바스크립트의 런타임 연산자 typeof를 사용한 것처럼 보이지만, 실제로는 타입스크립트 단계에서 연산되며 훨씬 더 정확하게 타입을 표현한다.

함수나 메서드의 반환 값에 명명된 타입을 만들고 싶을 때도 있다.

```typescript
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
// 추론된 반환 타입은 {userId: string, name: string, age: number ...}\
```
이때는 조건부 타입이 필요하다. 그러나 앞에서 살펴본 것처럼 표준 라이브러리에는 이러한 일반적 패턴의 제너릭 타입이 정의되어 있다.
이런 경우 ReturnType 제너릭이 정확히 들어맞는다.

```typescript
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
```

```typescript
type Pick<T, K> = {
    [K in K]: T[k]
}; // K 타입은 할당할 수 없습니다.
```
K는 T 타입과 무관하고 범위가 너무 넓다. K는 인덱스로 사용될 수 있는 string| number | symbol 이 되어야 하며 실제로는 범위를 조금 더 좁힐 수 있다.

```typescript
type Pick<T, K extends keyof T> = {
    [k in k]: T[k]
}; // 정상
```
타입이 값의 집합이라는 관점에서 생각하면 extends를 확장이 아니라 부분 집합이라는 것 이해하는데 도움된다.

## 🌈 Item 15. 동적 데이터에 인덱스 시그니처 사용하기
자바스크립트의 장점 중 하나는 바로 객체를 생성하는 문법이 간단하다는 것이다.

```typescript
const rocket = {
    name: 'a',
    variant: 'b',
    thrust: 'c'
};
```
자바스크립트 객체는 문자열 키를 타입의 값에 관계없이 매핑한다.
타입스크립트에서는 타입에 인덱스 시그니처를 명시하여 유연하게 매핑을 표현할 수 있다.

```typescript
type Rocket = {[property: string]: string};
```
이는 인덱스 시그니처이며, 다음 세가지 의미를 담는다.
- 키의 이름 : 키의 위치만 표시ㅘ는 용도
- 키의 타입 : string이나 number 또는 symbol의 조합, 보통은 string 시용
- 값의 타입 : 어떤 것이든 될 수 있다.

이렇게 타입 체크가 수행되면 네 가지 단점이 드러난다.
- 잘못된 키를 포함해 모든 키를 허용한다. name 대신 Name
- 특정 키가 필요하지 않다. {} 도 유효한 타입이다.
- 키마다 다른 타입을 가질 수 없다.
- 자동완성 기능이 동작하지 않는다.

인덱스 시그니처는 부정확하므로 더 나은 방법을 찾아야한다. 예를 들어 Rocket은 인터페이스여야한다.

```typescript
interface Rocket {
    name: string;
    variant: string;
    thrust_KN: number;
};
```
타입스크립트는 모든 필수 필드가 존재하는지 확인한다. 이제 타입스크립트에서 제공하는 언어 서비스를 모두 사용할 수 있게 되었다.

인덱스 시그니처는 동적 데이터를 표현할 때 사용한다. 일반적인 상황에서 열 이름이 무엇인지 미리 알 방법은 없다. 반면에 열 이름을 알고 있는 특정 상황에서는 미리 선언해 둔 타입으로 단언문을 사용한다.

```typescript
function parseCSV(input: string): {[columnName: string]: string}[] {
    /** */
    return rows.map(rowStr => {
        const row: {[columnName: string]: string} = {};
        rowStr.split('.').forEach((cell, i) => {
            row[headerColumns[i]] = cell;
        });
        return row;
    });
};
```

```typescript
interface ProductRow {
    productId: string;
    name: string;
    price: string;
}

declare let csvData: string;
const products = parseCSV(csvData) as unknown as ProductRow[];
```

선언해 둔 열들이 런타임에 실제로 일치한다는 보장은 없다. 이 부분이 걱정된다면 값 타입에 undefined를 추가할 수 있다.

```typescript
function parseCSV(input: string): {[columnName: string | undefined]: string}[]
```

연관 배열의 경우, 객체에 인덱스 시그니처를 사용하는 대신 Map 타입을 사용하는 것을 고려할 수 있다.

어떤 타입에 가능한 필드가 제한되어 있는 경우라면 인덱스 시그니처로 모델링하지 말아야 한다.
예를 들어 데이터에 A, B, C, D 같은 키가 있지만, 얼마나 많이 있는지 모른다면 선택적 필드 또는 유니온 타입으로 모델링하면 된다.

string 타입이 너무 광범위해서 인덱스 시그니처를 사용하는 데 문제가 있다면, 두 가지 다른 대안을 생각해볼 수 있다.

첫 번째 Record를 사용하는 방법이다. Record는 키 타입에 유연성을 제공하는 제너릭 타입이다.
```typescript
type Vec3D = Record<'x' | 'y' | 'z'>, number>;
```

두 번째, 매핑된 타입을 사용하는 방법이다.
```typescript
type Vec3D = {[k in 'x' | 'y' | 'z']: number};
```