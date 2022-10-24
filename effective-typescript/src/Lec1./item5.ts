// let age: number;
// age = '12'; //'string' 형식은 'number' 형식에 할당할 수 없습니다.
// age = '12' as any;

function calculateAge(birthDate: Date): number {
    //...
}

let birthDate: any = '1990-01-19';
calculateAge(birthDate); // 정상

let person: any = {
    first: "sungjin",
    last: "Hong"
};


// interface ComponentProps {
//     onSelectItem: (item: any) => void;
// }

interface ComponentProps {
    onSelectItem: (id: number) => void;
}

function renderSelector(props: ComponentProps){
    // ...
}

let selectId: number = 0;

function handleSelectItem(item: any) {
    selectId = item.id;
}

renderSelector({onSelectItem: handleSelectItem});