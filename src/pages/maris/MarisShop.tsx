import * as React from 'react';
import {DataGrid, GridColDef} from "@mui/x-data-grid";

function createData(
    image: string,
    id: string,
    cost: number,
    amount: number,
) {
    return {
        image,
        id,
        cost,
        amount,
    };
}

const rows = [
    createData("https://lostarkcodex.com/icons/use_7_169.webp", "Star's breath", 10, 30),
    createData("https://lostarkcodex.com/icons/use_8_251.webp", "Guardian stone fragment", 80, 72),
    createData("https://lostarkcodex.com/icons/use_8_250.webp", "Destruction stone fragment", 30, 120),
    createData("https://lostarkcodex.com/icons/use_8_231.webp", "Harmony shard pouch (S)", 5, 23),
    createData("https://lostarkcodex.com/icons/use_8_232.webp", "Harmony shard pouch (M)", 15, 141),
    createData("https://lostarkcodex.com/icons/use_10_25.webp", "Harmony leapstone", 5, 5),
];

const columns: GridColDef[] = [
    {field: 'image', headerName: '', width: 70, renderCell: (params) => <img src={params.value}/>},
    {field: 'id', headerName: 'Item', width: 200},
    {field: 'amount', headerName: 'Amount', width: 130},
    {field: 'cost', headerName: 'Cost', width: 130},
];

export default function MarisShop() {
    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid
                autoHeight={true}
                rows={rows}
                columns={columns}
                pageSize={10}
            />
        </div>
    );
}