type Rocket = {[property: string]: string};
const rocket: Rocket = {
    name: 'a',
    variant: 'b',
    thrust: 'c'
};

interface Rocket {
    name: string;
    variant: string;
    thrust_KN: number;
};

function parseCSV(input: string): {[columnName: string | undefined]: string}[] {
    /** */
    return rows.map(rowStr => {
        const row: {[columnName: string]: string} = {};
        rowStr.split('.').forEach((cell, i) => {
            row[headerColumns[i]] = cell;
        });
        return row;
    });
};

interface ProductRow {
    productId: string;
    name: string;
    price: string;
}

declare let csvData: string;
const products = parseCSV(csvData) as unknown as ProductRow[];