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

