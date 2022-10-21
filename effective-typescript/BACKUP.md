**타입 연산은 런타임에 영향을 주지 않는다.**

string 또는 number 타입인 값을 항상 number로 정제하는 경우를 가정해 보자.
다음 코드는 타입 체커를 통과하지만 잘못된 방법을 사용하였다.

```typescript
function asNumber(val: number | string): number {
    return val as number;
}
```
변환된 자바스크립트 코드를 보면 이 함수가 실제로 어떻게 동작하는지 알 수 있다.
```typescript
function asNumber(val) {
    return val;
}
```

코드에 아무런 정제 과정이 없다. `as number` 는 타입 연산이고 런타임 동작에는 아무런 영향을 미치지 않는다. 값을 정제하기 위해서는 런타임의 타입을 체크해야하고 자바스크립트 연산을 통해 변환을 수행해야한다.

```typescript
function asNumber(val: number | string): number {
    return typeof(val) === 'string' ? Number(val) : val;
}
```

**런타임 타입은 선언된 타입과 다를 수 있다.**
다음 함수를 보고 마지막의 console.log 까지 실행할 수 있는지 확인해보자.

```typescript
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
```

타입스크립트는 일반적으로 실행되지 못하는 죽은 코드를 찾아내지만, 여기서는 strict를 설정하더라도 찾아내지 못한다.
그러면 마지막 부분을 실행할 수 있는 경우는 무엇일까?
`: boolean` 이 타입 선언문이라는 것에 주목해야한다. 타입스크립트의 타입이기 때문에 `: boolean`은 런타임에 제거된다. 자바스크립트였다면 실수로 `setLightSwitch`를 "ON"으로 호출할 수 도 있었을 것이다.

순수 타입스크립트에서도 마지막 코드를 실행하는 방법이 존재한다. 예를 들어, 네트워크 호출로부터 받아온 값으로 함수를 실행하는 경우가 있다.

```typescript
interface LightApiResponse {
    lightSwitchValue: boolean;
}

async function setLight() {
    const response = await fetch('/light');
    const result : LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue);
}
```

`/light`를 호출하면 그 결과로 `LightApiResponse` 를 반환하라고 선언했지만, 실제로 그렇게 되리라는 보장은 없다.
API 를 잘못 파악해서 lightSwitchValue가 실제로는 문자열이었다면, 런타임에는 setLightSwitch 함수까지 전달 될 것이다.
또는 배포된 후에 API 가 변경되어 `lightSwitchValue`가 문자열이 되는 경우도 있을 것이다.

타입스크립트에서는 런타임 타입과 선언된 타입이 맞지 않을 수 있을 것이다. 타입이 달라지는 혼란스러운 상황을 가능한 한 피해야 한다. 선언된 타입이 언제든지 달라질 수 있다는 것을 명심하자.

**타입스크립트 타입으로는 함수를 오버로드할 수 없다.**

C++ 같은 언어는 동일한 이름에 매개변수만 다른 여러 버전의 함수를 허용한다. 이를 오버로딩이라고 한다. 그러나 타입스크립트에서는 타입과 런타임의 동작이 무관하기 때문에 불가능하다.

```typescript
function add(a: number, b: number) {
    return a + b; // 중복된 함수 구현
}

function add(a: string, b: string) {
    return a + b; // 중복된 함수 구현
}
```

타입스크립트가 함수 오버로딩 기능을 지원하기는 하지만, 온전히 타입 수준 에서만 동작한다. 하나의 함수에 대해 여러 개의 선언문을 작성할 수 있지만, 구현체는 하나 뿐이다.

즉, 위의 `add` 라는 런타임 시점에는,
```typescript
function add(a, b) {
    return a + b;
}
```
라는 함수로 남게 되는 것이다.

**타입스크립트 타입은 런타임 성능에 영향을 주지 않는다**

타입과 타입 연산자는 자바스크립트 변환 시점에 제거되기 때문에, 런타임 성능에 아무런 영향을 주지 않는다. 
타입스크립트의 정적 타입은 실제로 비용이 전혀 들지 않는다. 타입스크립트를 쓰는 대신 런타임 오버헤드를 감수하며 타입 체크를 해본다면, 
타입스크립트 팀이 다음 주의 사항들을 얼마나 잘 테스트 해왔는지 몸소 느끼게 될 것이다.

- 런타임 오버헤드가 없는 대신, 타입스크립트 컴파일러는 빌드 타임 오버헤드가 있다.
- 타입스크립트가 컴파일하는 코드는 오래된 런타임 환경을 지원하기 위해 호환성을 높이고 성능 오버헤드를 감안할지, 호환성을 포기하고 성능 중심의 네이티브 구현체를 선택할지의 문제에 맞닥뜨릴 수도 있다. 어떤 경우든지 호환성과 성능 사이의 선택은 컴파일 타깃과 언어 레벨의 문제이며 여전히 타입과는 무관하다.

## 🌈 Item4. 구조적 타이핑에 익숙해지기
자바스크립트는 본질적으로 덕 타이핑 기반이다. 만약 어떤 함수의 매개변수 값이 모두 제대로 주어진다면, 그 값이 어떻게 만들어졌는지 신경 쓰지 않고 사용한다.
타입스크립트는 이런 동작, 즉 매개변수 값이 요구사항을 만족한다면 타입이 무엇인지 신경 쓰지 않는 동작을 그대로 모델링한다.
타입 체커의 타입에 대한 이해도가 사람과 조금 다르기 때문에 가끔 예상치 못한 결과가 나오기도 한다. 구조적 타이핑을 제대로 이해한다면 오류인 경우과 오류가 아닌 경우의 차이를 알 수 있고, 더욱 견고 한 코드를 작성할 수 있다.

```typescript
interface Vector2D {
    x: number;
    y: number;
}
function calculate(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
```
위와 같은 코드가 있다고 가정해보자.

이제 이름이 들어간 벡터를 하나 추가한다.
```
interface NamedVector {
    name: string;
    x: number;
    y: number;
}
```

`NamedVector` 는 number 타입의 x와 y 속성이 있기 때문에 `calculate` 함수로 호출 가능하다.
타입스크립트는 다음 코드를 충분히 잘 이해할 수 있다.
```typescript
const v: NamedVector = {x: 3, y: 4, name: "Hello"};
calculate(v);
```

여기서 흥미로운 점은 `Vector2D` 와 `NamedVector`의 관계를 전혀 선언하지 않았다는 것이다. 타입스크립트 타입 시스템은 자바스크립트의 런타임 동작을 모델링한다. `Vector2D` 와 `NamedVector`가 호환되기 때문에 타입이 다른 함수 또한 호출할 수 있었다.
여기서 구조적 타이핑이라는 용어가 사용된다.

구조적 타이핑때문에 문제가 되는 경우도 발생한다.

3D 벡터 타입이 있고, 길이를 1로 만드는 정규화 함수가 있다고 가정하자.
```typescript
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
```

그러나 이 함수는 1보다 조금 더긴 길이를 가진 결과를 출력할 것이다.
이런 오류를 타입스크립트가 잡지 못한 이유는 다음과 같다.

`calculate`는 2D 벡터 기반으로 연산하는데, 버그로 인해 `normalize`가 3D 벡터로 연산되었다. z가 정규화에서 무시된다.
그런데, 타입 체커가 이 문제를 잡아내지 못했다. 왜 이런 문제가 발생했을까?

Vector3D 와 호환되는 {x, y, z} 객체로 `calculate` 를 호출하면, 구조적 타이핑 관점에서 x 와 y 가 있기 때문에 Vector2D와 호환된다. 따라서 오류가 발생하지 않고, 타입 체커가 문제로 인식하지 않는다.

함수를 작성할 때, 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만을 가질 거라 생각하기 쉽다. 이러한 타입은
봉인된 또는 정확한 타입이라 불리고, 타입스크립트의 타입 시스템에서는 표현할 수 없다.

이러한 특성 때문에 당황스러운 결과도 발생한다.
```typescript
function calculateL1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis];
        length += Math.abs(coord);
    }
    return length;
}
```

![스크린샷 2022-10-21 오후 3 40 19](https://user-images.githubusercontent.com/56334761/197130054-cb17d520-adf0-465f-a00f-93d7b2cab60a.png)

오류를 납득하기 어렵다. `axis`는 `Vector3D` 타입이기 때문에 x, y, z중 하나여야 한다. 그러나 사실은
타입스크립트가 정확히 오류를 파악한 것이 맞다. 

```typescript
const vec3D = {x: 3, y: 4, z: 1, name: "name"}
calculateL1(vec3D);
```
위의 코드처럼 실행 될 수도 있다.
매개변수 v는 어찌 되었건 어떤 속성이든 가질 수 있기 때문에, `v[axis]` 의 타입은 string이 될 수도 있는 것이다. 정확한 타입으로 객체를 순회하는 것은 까다로운 문제이다.

구조적 타이핑은 클래스와 관련된 할당문에서도 당황스러운 결과를 보여준다.

```typescript
class C {
    foo: string,
    constructor(foo: string) {
        this.foo = foo;
    }
}

const c = new C("instance of C");
const d: C = {foo: 'object literal'}; // 정상
```
d가 c 타입에 할당되는 이유를 알아보자. d는 string 타입의 foo 속성을 갖는다. 게다가 하나의 매개변수로 호출이 되는 생성자(`Object.prototype` 에서 비롯된)를 갖는다.
그래서 구조적으로 필요한 속성과 생성자가 존재하기 때문에 문제가 없다. 만약 C의 생성자에 단순 할당이 아닌
연산 로직이 존재한다면, d의 경우는 생성자를 실행하지 않으므로 문제가 발생한다.

테스트를 작성할 때는 구조적 타이핑이 유리하다. 데이터베이스에 쿼리하고 결과를 처리하느 함수를 가정해보자.
```typescript
interface Author {
    first: string;
    last: string;
}

function getAuthors(database: PostgresDB): Author[] {
    const authorRows = database.runQuery("select first, last from authors");
    return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```

`getAuthors` 함수를 테스트하기 위해서는 모킹한 `PostgresDB` 를 생성해야한다. 그러나 구조적 타이핑을 활용하여
더 구체적인 인터페이스를 정의하는 것이 더 나은 방법이다.
```typescript
interface DB {
    runQuery: (sql: string) => any[];
}
```
구조적 타이핑 덕분에, `PostgresDB` 가 `DB` 인터페이스를 구현하는지 명확히 선언할 필요가 없다.

테스트를 작성할때, 더 간단한 객체를 매개변수로 사용할 수도 있다.

```typescript
test('getAuthors', () => {
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
```
타입스크립트는 테스트 DB 가 해당 인터페이스를 충족하는지 확인한다. 그리고 테스트 코드에는 실제 환경의 데이터베이스에 대한 정보가 불필요하다. 추상화를 함으로써, 로직과 테스트를 특정 구현으로부터 분리한 것이다.