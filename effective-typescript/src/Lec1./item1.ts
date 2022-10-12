// Valid TypeScript
function greet(who: string) {
    console.log('Hello', who);
}

let city = `new york city`;
console.log(city.toUpperCase());

// const states = [
//     {
//         name: 'A',
//         capital: "seoul"
//     },
//     {
//         name: 'B',
//         capital: "Phoenix"
//     },
//     {
//         name: 'C',
//         capital: "Tokyo"
//     }
// ]

for(const state of states) {
    console.log(state.capital);
}

interface State {
    name: string;
    capital: string;
}
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