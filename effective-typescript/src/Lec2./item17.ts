function printTriangles(n: number) {
    const nums = [];
    for (let i = 0; i < n ; i++) {
        nums.push(i);
        console.log(arraySum(nums));
    }
}

function arraySum(arr: number[]) {
    let sum = 0, num;
    while ((num =arr.pop()) !== undefined) {
        sum += sum;
    }
    return sum;
}

function arraySum(arr: readonly number[]) {
    let sum = 0, num;
    while ((num =arr.pop()) !== undefined) { // 'readonly number[]' 형식에 'pop' 속성이 없습니다.
        sum += sum;
    }
    return sum;
}

function arraySum(arr: readonly number[]) {
    let sum = 0, num;
    for (const num of arr) {
        sum += sum;
    }
    return sum;
}

const dates: readonly Date[] = [new Date()];
dates.push(new Date()); // 'readonly Date[]' 형식에 'push' 속성이 없습니다.
dates[0].setFullYear(2037); // 정상

interface Outer {
    inner: {
        x: number;
    }
}
const ooo: Readonly<Outer> = {inner: {x:0}};
ooo.inner = {x: 1}; // 읽기 전용 속성이므로 'inner'에 할당할 수 없습니다.