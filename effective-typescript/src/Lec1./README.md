# 1장. 타입스크립트 알아보기
타입스크립트란 무엇이고, 타입스크립트를 어떻게 여겨야 하는지, 자바스크립트와는 어떤 관계인지, 타입스크립트의 타입들은 null이 가능한지, any 타입에서는 어떨지, 덕 타이핑이 가능한지등을 알아본다.

타입스크립트는 인터프리터로 실행되는 것도 아니고, 저수준 언어로 컴파일 되는 것도 아니다. 자바스크립트로 컴파일되며, 실행 역시 타입스크립트가 아닌 자바스크립트로 이루어진다.

따라서, 둘의 관계는 필연적이다. 이러한 타입스크립트와 자바스크립트의 관계를 잘 이해한다면 타입스크립트 개발자로서 한 단계 성장할 것이다.

## 🌈 Item1. 타입스크립트와 자바스크립트의 관계 이해하기

“타입스크립트는 자바스크립트의 상위 집합이다” 라는 말이 많다. 이 문장들이 정확히 무슨 의미인지, 타입스크립트와 자바스크립트는 어떤 관계인지 자세히 알아보자. 타입스크립트는 자바스크립트와 굉장히 밀접한 관계에 있기 때문에, 어떻게 연관되어 있는지 제대로 이해하는 것이 중요하다.



자바스크립트는 파일이 .js 확장자를 사용하는 반면, 타입스크립트파일은 .ts 파일을 사용한다. 그렇다고 자바스크립트와 타입스크립트가 다르다는 것을 의미하는 것은 아니고 타입스크립트가 자바스크립트의 슈퍼셋이기 때문에 .js 파일에 있는 코드는 이미 타입스크립트라고 할 수 있다.



이러한 특성은 기존에 존재하는 자바스크립트 코드를 타입스크립트로 마이그레이션 하는데 엄청난 이점이 된다. 모든 자바스크립트 프로그램이 타입스크립트라는 명제는 참이지만, 그 반대는 성립하지 않는다. 즉, 타입스크립트 프로그램이지만 자바스크립트가 아닌 프로그램이 존재하게 된다. 이는 타입스크립트가 타입을 명시하는 추가적인 문법을 가지기 때문이다.



다음의 예를 보자.
```typescript
function greet(who: string) {
    console.log('Hello', who);
}
```

이는 유효한 타입스크립트 프로그램이다.

그러나 자바스크립트를 구동하는 노드 같은 프로그램으로 앞의 코드를 실행하면 오류를 출력한다. 즉, 타입구문을 사용하는 순간부터 자바스크립트가 아닌 타입스크립트의 영역이다.



타입스크립트 컴파일러는 타입스크립트뿐만 아니라 일반 자바스크립트 프로그램에도 유용하다. 다음의 예를 보자.
```
let city = `new york city`;
console.log(city.toUpperCase());
```
이 코드를 자바스크립트 컴파일로서 실행하면 다음과 같은 오류가 발생한다.

`TypeError: city.toUppercase is not a function`

앞의 코드에는 타입 구문이 없지만, 타입스크립트의 타입 체커는 문제점을 찾아 냅니다. city 변수가 문자열이라는 것을 알려주지 않아도 타입스크립트는 초깃값으로부터 타입을 추론한다.

타입시스템의 목표중 하나는 런타임에 오류를 발생시킬 코드를 미리 찾아내는 것이다. 타입스크립트가 ‘정적’타입 시스템이라는 것은 바로 이런 특징을 말한다.

그러나 모든 오류를 찾아내지는 않는다. 오류가 발생하진 않아도 다른 의도로 동작하는 코드도 있다. 

다음의 자바스크립트 프로그램을 보자.
```typescript
const states = [
    {
        name: 'A',
        capital: "seoul"
    },
    {
        name: 'B',
        capital: "Phoenix"
    },
    {
        name: 'C',
        capital: "Tokyo"
    }
]

// undefined
// undefined
// undefined
for(const state of states) {
    console.log(state.capitol);
}
```
앞의 코드는 유효한 자바스크립트이며 어떠한 오류도 없이 실행된다. 그러나 루프 내의 state.capial 은 의도한 코드가 아니다.

이런 경우에 타입스크립트 타입체커는 오류를 제시한다.



타입스크립트는 타입 구문 없이도 오류를 잡을 수 있지만, 타입 구문을 추가한다면 훨씬 더 많은 오류를 찾아낼 수 있다.

물론, 위의 예에서는 어느 쪽이 오타인지 판단하지는 못한다. 따라서 명시적으로 states 를 선언하여 의도를 분명히 해야한다.
```typescript
interface State {
    name: string;
    capital: string;
}
const states: State[] = [
    {
        name: 'A',
        capitol: "seoul"
    },
    {
        name: 'B',
        capital: "Phoenix"
    },
    {
        name: 'C',
        capital: "Tokyo"
    }
]
```


이제 오류가 어디에서 발생했는지 찾을 수 있고, 제시된 해결책도 올바르다. 의도를 명확히 해서 타입스크립트가 잠재적 문제점을 찾을 수 있게 했다.



타입스크립트 타입 시스템은 자바스크립트의 런타임 동작을 ‘모델링’ 한다. 런타임 체크를 엄격하게 하는 언어를 사용해 왔다면 다음 결과들이 꽤 당황스럽게 느껴질 것이다.
```typescript
const x = 2 + '3'; // 정상, string 타입
const y = '2' + 3; // 정상, string 타입
```
이 예제는 다른 언어였다면 런타임 오류가 될 만한 코드이다. 하지만 타입스크립트의 타입 체커는 정상으로 인식한다. 두 줄 모두 ‘23’으로 출력된다.

반대로 정상 동작하는 코드에 오류를 표시하기도 한다. 다음은 런타임 오류가 발생하지 않는 코드인데, 타입 체커는 문제점을 표시한다.
```typescript
const a = null + 7; // 자바스크립트에는 a값이 7
const b = [] + 12; // 자바스크립트에는 b의 값이 12
alert('Hello', 'TypeScript'); // "Hello" 경고를 표시
```
자바스크립트의 런타임 동작을 모델링하는 것은 타입스크립트 타입 시스템의 기본 원칙이다. 물론, 프로그램에서 오류가 발생하지 않더라도 타입체커가 오류를 표시할 때도 있다.



언제 자바스크립트 런타임 동작을 그대로 모델링할지, 또는 추가적인 타입을 체크를 할 지 분명하지 않다면 타입스크립트를 왜 사용하는지 의문이 들 수 있다. 순전히 사용자의 몫이며, 위의 오류처럼  null + 7 이 7을 출력한다는 것이 익숙하다면 사용하지 않아도 된다.
## 🌈 Item2. 타입스크립트 설정 이해하기

다음 코드가 오류 없이 타입 체커를 통과할 수 있을지 생각해 보자.
```typescript
function add(a, b) {
    return a + b;
}
add(10, null);
```
설정이 어떻게 되었냐에 따라 대답할 수 없는 질문이다. 타입스크립트 컴파일러는 매우 많은 설정을 가지고 있다.

이런 설정들은 커맨드라인을 이용하면 됩니다.

`tsc --noImplicitAny program.ts`

tsconfig.json 설정 파일에서도 확인 가능하다.
<img width="798" alt="스크린샷 2022-10-13 오전 12 23 01" src="https://user-images.githubusercontent.com/56334761/196466894-38dae9db-40d2-48e6-9eac-04ac10be9e61.png">

가급적 설정 파일을 사용하는 것이 좋다. 그래야만 타입스크립트를 어떻게 사용할 계획인지 나눌 수 있기 때문이다. 설정 파일은 tsc --init 만 실행하면 간단히 생성된다.

타입스크립트는 어떻게 설정하느냐에 따라 완전히 다른 언어처럼 느낄 수 있다. 설정을 제대로 사용하려면, noImplicitAny 와 strictNullChecks 를 이해해야 한다.

noImplicitAny 는 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어한다. 위의 add 의 함수의 경우에는 이 설정이 해제되어 있을 때에는 유효하다.

매개변수에 any 코드를 넣지 않았지만, any 타입으로 간주되기 때문에 이를 암시적 any 라고 부른다. 그런데 같은 코드임에도 noImplicitAny 가 설정되었다면 오류가 된다.
<img width="509" alt="스크린샷 2022-10-18 오후 11 49 52" src="https://user-images.githubusercontent.com/56334761/196466912-3d0e8064-2ca8-41ac-b12a-3d0ceba867ea.png">

이 오류들은 명시적으로 : any 라고 선언해주거나 더 분명한 타입을 사용하면 해결할 수 있다.

타입스크립트는 타입 정보를 가질 때 가장 효과적이기 때문에, 되도록이면 noImplicitAny 를 설정해야한다. 이를 통해서 타입이 명시될 것이며 문제를 발견하기 수월해지고, 코드의 가독성이 좋아지며, 개발자의 생산성이 향상된다.


다음은 strictNullChecks 가 해제되었을 때 유효한 코드이다.

`const x: number = null; // 정상`

`strictNullChecks`를 설정하면 오류가 된다.
<img width="377" alt="스크린샷 2022-10-19 오전 12 00 53" src="https://user-images.githubusercontent.com/56334761/196467671-5100c1cd-f216-4430-a0f2-dcddfd7f7f6d.png">

null 대신 undefined를 써도 같은 오류가 난다. 만약 null을 허용하려고 한다면 의도를 명시적으로 드러냄으로써 오류를 고칠 수 있다.
`const x: number | null = null;`

만약 null을 허용하지 않으려면, 이 값이 어디서부터 왔는지 찾아야 하고, null 을 체크하는 코드나 단언문을 추가해야 한다.

```typescript
const el = document.getElementById('status');
el.textContent = 'Ready';

if(el) {
    el.textContent = 'Ready'; // 정상 null은 제외
}
el!.textContent = 'Ready'; // 정상, el이 null 이 아님을 단언
```
`strictNullChecks` 는 null 과 undefined 관련된 오류를 잡아 내는 데 많은 도움이 되지만, 코드 작성을 어렵게 한다. 새 프로젝트를 시작한다면 설정을 하는 것이 좋지만, 익숙치 않으면 설정하지 않아도 괜찮다.
`strictNullChecks` 설정하려면 `noImplicitAny` 를 먼저 설정해야한다.
만약, 이 설정 없이 개발하기로 했다면 undefined 는 객체가 아닙니다 라는 끔찍한 런타임 오류를 주의해야 한다.
결국은 이 오류 때문에 설정을 할 수밖에 없을테니 가급적 초기에 설정하는 것이 좋을 것이다.
언어에 의미적으로 영향을 미치는 설정들이 많지만, 지금 배운 설정들 만큼 중요한 설정은 없다.
만약 모든 체크를 설정하고 싶다면 간단하게 `strict` 만 `true`로 바꿔주면 된다.

## Item3. 코드 생성과 타입이 관계없음을 이해하기
타입스크립트 컴파일러는 두 가지 역할을 수행한다.
- 최신 타입스크립트/자바스크립트를 브라우저에서 동작할 수 있도록 구버전의 자바스크립트로 트랜스파일한다.
- 코드의 타입 오류를 체크한다.

여기서 놀라운 점은 이 두 가지가 서로 완벽히 독립적이라는 것이다. 다시 말해서, 타입스크립트가 자바스크립트로 변환될 때 코드 내의 타입에는 영향을 주지 않는다. 또한 그 자바스크립트의 실행 시점에도 타입은 영향을 미치지 않는다.

**타입 오류가 있는 코드도 컴파일이 가능하다**
컴파일은 타입 체크와 독립적으로 동작하기 때문에, 타입 오류가 있는 코드도 컴파일이 가능하다.
타입 체크와 컴파일이 동시에 이루어지는 C나 자바 같은 언어를 사용하던 사람이라면 이러한 상황이 매우 황당하게 느껴질 것이다.
타입 오류가 있는 데도 컴파일된다는 사실 때문에 타입스크립트가 엉성한 언어처럼 보일 수 있다.
그러나, 코드에 오류가 있더라도 컴파일된 산출물이 나오는 것이 실제로 도움된다. 예를들어, 문제가 된 오류를 수정하지 않더라도 애플리케이션의 다른 부분을 테스트할 수 있다.
만약 오류가 있을 때 컴파일하지 않으려면, tsconfig.json에 noEmitOnError를 설정하거나 빌드 도구에 동일하게 적용하면 된다.

**런타임에는 타입 체크가 불가능 하다.**
다음 처럼 코드르 작성해 볼 수 있다.
```typescript
interface Square {
    width: number;
}
interface Rectangle extends Square {
    height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    } else {
        return shape.width * shape.width;
    }
}
```
<img width="492" alt="스크린샷 2022-10-21 오전 12 02 08" src="https://user-images.githubusercontent.com/56334761/196985699-b592588b-1373-42c5-8ac7-9db796a6e2f7.png">

<img width="354" alt="스크린샷 2022-10-21 오전 12 02 55" src="https://user-images.githubusercontent.com/56334761/196985850-6c020f60-770e-4b4f-a548-991091e1d630.png">

`instanceof` 체크는 런타임에 일어나지만, `Rectangle` 은 타입이기 때문에 런타임 시점에 아무런 역할을 할 수 없다. 타입스크립트의 타입은 제거 가능하다.
실제로 자바스크립트로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 구문은 그냥 제거된다.
앞의 코드에서 다루고 있는 `shape`타입을 명확하게 하려면, 런타임에 타입 정보를 유지하는 방법이 필요하다. 하나의 방법은 `height` 속성이 존재하는지 체크하는 것이다.

```typescript
function calculateArea(shape: Shape) {
    if('height' in shape) {
        shape; // Rectangle
        return shape.height * shape.width;
    } else {
        shape; // Square
        return shape.width * shape.width;
    }
}
```
속성 체크는 런타임에 접근 가능한 값에만 관련되지만, 타입 체커 역시도 `shape` 의 타입을 `Rectangle` 로 보정해 주기 때문에 오류가 사라진다.
타입 정보를 유지하는 또 다른 방법으로는 런타임에 접근 가능한 타입 정보를 명시적으로 저장하는 태그 기법이 있다.

```typescript
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
```
여기서 `Shape` 타입은 태그된 유니온의 한 예다. 이 기법은 런타임에 타입 정보를 손쉽게 유지할 수 있기 때문에, 타입스크립트에서 흔하게 볼 수 있다.

타입과 값을 둘 다 사용하는 방법도 있다. 타입을 클래스로 만들면 된다.
```typescript
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
```
인터페이스는 타입으로만 사용 가능하지만, Rectangle을 클래스로 선언하면 타입과 값으로 모두 사용할 수 있으므로 오류가 없다.
`type Shape = Square | Rectangle` 부분에서 `Rectangle` 은 타입으로 참조되지만, `shape instanceof Rectangle` 부분에서는 값으로 참조 된다.

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

## 🌈 Item5. any 타입 지양하기
타입스크립트의 타입 시스템은 점진적이고 선택적이다. 코드에 타입을 조금씩 추가할 수 있기 때문에 점진적이며,
언제든지 타입 체커를 해제할 수 있기 때문에 선택적이다. 이 기능들의 핵심은 `any` 타입이다.

```typescript
let age: number;
age = '12'; //'string' 형식은 'number' 형식에 할당할 수 없습니다.
age = '12' as any;
```
타입체커를 통해 앞의 코드에서 오류를 찾아냈다. 오류는 `as any` 를 추가해 해결핼 수 있었다. 위의 코드에서만
볼때는 충분히 매력적으로 보일 수 도 있으나 일부 특별한 경우를 제외하고는 `any` 타입을 사용하면 
타입스크립트에서 누릴 수 있는 장점이 없어진다.

**`any` 타입에는 타입 안정성이 없다.**

앞의 예제에서 `age` 는 number 타입으로 선언되었다. 그러나 `as any`를 사용하면 string 타입을 할당할 수있다.
타입 체커는 선언에 따라 number 타입으로 판단할 것이고 혼돈은 걷잡을 수 없게 된다.
```typescript
age += 1; // age = '121'
```

**`any` 는 함수 시그니처를 무시한다.**

함수를 작성할 때 시그니처를 명시해야한다. 호출하는 쪽은 약속된 타입의 입력을 제공하고, 함수는 약속된 타입의 출력을 반환해야한다.
하지만, `any` 를 써버린 이상 이런 약속을 어길 수 있다.

```typescript
function calculateAge(birthDate: Date): number {
    //...
}

let birthDate: any = '1990-01-19';
calculateAge(birthDate); // 정상
```
`birthDate` 매개변수는 string 이 아닌 Date 타입이어야한다. any 타입은 이 시그니처를 무시하게 된다.
자바스크립트에서는 암시적으로 타입이 변환되기 때문에 특히 문제가 될 수 있다. string 타입은 number 타입이 
필요한 곳에서 오류 없이 실행될 때 가 있고, 그런 경우 다른 곳에서 문제를 일으킬 것이다.

**`any` 타입에는 언어 서비스가 적용되지 않는다.**

어떤 심벌에 타입이 있다면 타입스크립트 언어 서비스는 자동완성 기능과 적절한 도움말을 제공한다.

![스크린샷 2022-10-21 오후 4 45 04](https://user-images.githubusercontent.com/56334761/197141763-edaa90c6-55ee-4a2a-8af4-de8792d1e46c.png)

그러나 `any` 타입에는 적용되지 않는다.

![스크린샷 2022-10-21 오후 4 46 51](https://user-images.githubusercontent.com/56334761/197141926-7f7b633a-1b1f-4b94-9181-6a3019d4c026.png)

이 외에도 다양한 언어 서비스를 받지 못한다고 한다.

타입스크립트의 모토는 '확장 가능한 자바스크립트'이다. '확장'의 중요한 부분은 바로 타입스크립트 경험의 핵심 요소인
언어 서비스다. 언어 서비스를 제대로 누려야 생산성이 향상될 것이다.

**`any` 타입은 코드 리팩터링 때 버그를 감춘다.**

어떤 아이템을 선택할 수 있는 웹 애플리케이션을 만든다고 가정해 보자. 애플리케이션에는 `onSelectItem` 콜백이 있는 컴포넌트가 있을 것이다.

선택하려는 아이템 타입이 무엇인지 알기 어려우니 `any`를 사용해 보자.

``` typescript
interface ComponentProps {
    onSelectItem: (item: any) => void;
}
```
다음과 같이 `onSelectItem` 콜백이 있는 컴포넌트를 사용하는 코드도 있을 것이다.

```typescript
interface ComponentProps {
    onSelectItem: (item: any) => void;
}

function renderSelector(props: ComponentProps){
    // ...
}

let selectId: number = 0;

function handleSelectItem(item: any) {
    selectId = item.id;
}

renderSelector({onSelectItem: handleSelectItem});
```
`onSelectItem` 에 아이템 객체를 필요한 부분만 전달하도록 컴포넌트를 개선해 보자. 여기서는 Id 만 필요하다.

```typescript
interface ComponentProps {
    onSelectItem: (id: number) => void;
}
```

컴포넌트를 수정하고 타입 체크를 모두 통과했다.
하지만, 타입 체크를 통과했다고 끝난 것은 아니다. `handleSelectItem` 은 `any` 매개변수를 받는다.
따라서 id를 전달받아도 문제가 없다고 나온다. 즉, 타입 체커를 통과함에도 불구하고 런타임에 오류가 발생할 것이다.
`any` 가 아니라 구체적인 타입을 사용했다면, 타입 체커가 오류를 발견했을 것이다.

**`any` 는 타입 설계를 감춘다.**

애플리케이션 상태 같은 객체를 정의하려면 꽤 복잡하다. 상태 객체 안에는 수많은 속성의 타입을 일일이 작성해야하는데, `any` 타입을 사용하면 간단히 끝낼 수 있다.

물론 이때도 `any`를 사용하면 안된다. 이유는 앞에서 설명했던 것과 일맥상통하다.

깔끔하고 정확하고 명료한 코드 작성을 위해 제대로 된 타입 설계는 필수다. `any` 타입을 사용하면 타입 설계가
불분명해진다.

**`any` 는 타입시스템의 신뢰도를 떨어뜨린다.**

사람은 항상 실수를 한다. 보통은 타입 체커가 실수를 잡아주고 코드의 신뢰도가 높아진다. 그러나 런타임시에 타입 오류를 발견하게 된다면 타입 체커를 신뢰할 수 없을 것이다.
`any` 타입을 쓰지 않으면 런타임에 발견될 오류를 미리 잡을 수 있고 신뢰도를 높일 수 있다.

어쩔 수 없이 `any` 를 써야만 하는 상황도 있다. 이럴 때 고민해 볼 수 있는 좋은 방법과 좋지 못한 방법이 있다.
any의 단점을 어떻게 보완해야 하는지 나중에 다뤄보자.