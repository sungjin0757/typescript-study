/**
 * 기본적으로 모든 타입은 any로 설정되어있다. 파라미터 지정시에, "파라미터:tpye" 양식으로 각 파라미터의 type을 지정해줄 수 있다.
 * 함수 호출 시에 지정된 형식이 아닌 인자를 입력하면 ts 파일에서 에러가 나오게 된다. 
 */

/**
 * 타입 추론
 * 만약 타입스크립트 파일에서 어떤 변수를 선언하는데 타입을 지정하지 않는다면, 타입스크립트가 타입 추론을 하여 해당 변수의 타입을 지정하게 된다.
 * 예를 들어 let a = 5; 라고 하고, a = "hi" 라고 재지정하는 구문을 타입스크립트 파일에 작성한다면,
 * 타입스크립트는 a의 타입을 number 로 추론하였기 때문에 string으로 재지정할 수 없도록 에러를 띄운다. 또한 타입추론을 이용하면 굳이 속성의 타입값을 지정하고 기본값을 지정하지 않고
 * 기본값만 지정할 수 있게 됭다. 예를 들어 "age:number = 27" 이라 지정할 필요 없이 "age = 27" 라고만 해도 타입 추론에 의해 자동으로 타입이 설정 된다.
 */
const printPerson = (name: string, age: number, gender: string) => {
    console.log(`Hello, name = ${name}, age = ${age}, gender = ${gender}`);
}

printPerson("Hong", 27, "male");

/**
 * 선택적 매개변수 (Optional Parameter)
 * arguments 개수가 부족하면 함수에 마우스를 올렸을 때 함수 호출부에서 경고문을 띄워주고, 실제로 compile을 할려고 해도 에러가 나게 된다. parameter 부분에 물음표를
 * 붙여주면 해당 파라미터는 선택적인 것으로 설정하여 compile이 되게 할 수도 있다.
 * 그러나 지정이 안되어 있으므로 undefined 로 출력된다.
 * 만약 하나의 함수에 여러 개의 선택적 매개변수를 지정하고 싶다면, 선택적 매개변수는 반드시 기본 매개변수들의 뒤쪽에 위치해야만 한다.
 */
const printPersonWithOptionalParams = (name: string, age: number, gender?: string) => {
    console.log(`Hello, name = ${name}, age = ${age}, gender = ${gender}`);
}

printPersonWithOptionalParams("Hong", 27); // gender : undefined
printPersonWithOptionalParams("Hong", 27, "male"); // gender : male

/**
 * 함수 반환값 타입지정
 * 아무것도 return 하지 않는 함수라면 파라미터 선언부 괄호 끝에 : 을 붙인 후 void라고 입력해주는 것이 더 정확하다.
 * 만약 문자열을 return 하는 함수로 바꾼다면, void도 string으로 바꿔줘야 한다.
 */
const printPersonVoidVersion = (name: string, age: number, gender?: string): void => {
    console.log(`Hello, name = ${name}, age = ${age}, gender = ${gender}`);
}

const printPersonStringVersion = (name: string, age: number, gender?: string): string => {
    return `Hello, name = ${name}, age = ${age}, gender = ${gender}`;
}

printPersonVoidVersion("Hong", 27, "male");
console.log(printPersonStringVersion("Hong", 27, "male"));