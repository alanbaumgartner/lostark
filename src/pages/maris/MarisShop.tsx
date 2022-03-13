import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';


function exchangeComponent() {
    return (
        <div/>
    );
}

function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small"/>,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{visibility: props.value ? 'visible' : 'hidden'}}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    ),
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.5,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottom: 1,
                        borderColor: 'divider',
                    },
                }}
            />
        </Box>
    );
}

function createData(
    image: string,
    id: string,
    amount: number,
    cost: number,
) {
    return {
        image,
        id,
        amount,
        cost,
    };
}

const rowData = [
    // Tier 1
    createData("https://lostarkcodex.com/icons/use_7_169.webp", "Star's breath x10", 10, 30),
    createData("https://lostarkcodex.com/icons/use_8_251.webp", "Guardian stone fragment x800", 800, 72),
    createData("https://lostarkcodex.com/icons/use_8_250.webp", "Destruction stone fragment x300", 300, 120),
    createData("https://lostarkcodex.com/icons/use_8_231.webp", "Harmony shard pouch (S) x5", 5, 23),
    createData("https://lostarkcodex.com/icons/use_8_232.webp", "Harmony shard pouch (M) x15", 15, 141),
    createData("https://lostarkcodex.com/icons/use_10_25.webp", "Harmony leapstone x5", 5, 5),
    createData("https://lostarkcodex.com/icons/use_10_25.webp", "Harmony leapstone x30", 30, 30),
    // Tier 2
    createData("https://lostarkcodex.com/icons/use_7_16.webp", "Guardian stone x400", 400, 80),
    createData("https://lostarkcodex.com/icons/use_7_16.webp", "Guardian stone x800", 800, 160),
    createData("https://lostarkcodex.com/icons/use_7_15.webp", "Destruction stone x150", 150, 84),
    createData("https://lostarkcodex.com/icons/use_7_15.webp", "Destruction stone x300", 300, 167),
    createData("https://lostarkcodex.com/icons/use_8_229.webp", "Life shard pouch (S) x10", 10, 38),
    createData("https://lostarkcodex.com/icons/use_10_24.webp", "Life leapstone x40", 40, 56),
    createData("https://lostarkcodex.com/icons/use_7_167.webp", "Moon's breath x5", 5, 30),
    createData("https://lostarkcodex.com/icons/use_9_69.webp", "Caldarr fusion material x10", 10, 70),
    // Tier 3
    createData("https://lostarkcodex.com/icons/use_6_104.webp", "Guardian stone crystal x800", 800, 240),
    createData("https://lostarkcodex.com/icons/use_6_105.webp", "Destruction stone crystal x300", 300, 240),
    createData("https://lostarkcodex.com/icons/use_8_225.webp", "Honor shard pouch (S) x10", 10, 56),
    createData("https://lostarkcodex.com/icons/use_7_155.webp", "Honor leapstone x10", 10, 20),
    createData("https://lostarkcodex.com/icons/use_7_156.webp", "Great Honor leapstone x5", 5, 50),
    createData("https://lostarkcodex.com/icons/use_7_161.webp", "Solar grace x20", 20, 80),
    createData("https://lostarkcodex.com/icons/use_7_162.webp", "Solar blessing x15", 15, 150),
    createData("https://lostarkcodex.com/icons/use_7_163.webp", "Solar protection x3", 3, 150),
    createData("https://lostarkcodex.com/icons/use_9_70.webp", "Simple Oreha fusion material x10", 10, 30),
    createData("https://lostarkcodex.com/icons/use_9_71.webp", "Basic Oreha fusion material x10", 10, 40),
];

const columns: GridColDef[] = [
    {
        field: 'image',
        headerName: '',
        width: 70,
        renderCell: (params) => <img height="80%" width="80%" src={params.value} alt={""}/>
    },
    {field: 'id', headerName: 'Item', width: 250},
    {field: 'cost', headerName: 'Cost', width: 130},
    {field: 'amount', headerName: 'Amount', width: 130},
];

export default function MarisShop() {

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<any[]>(rowData);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = rowData.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        setRows(rowData);
    }, [rowData]);
    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid
                autoHeight={true}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{Toolbar: QuickSearchToolbar}}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                            requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
            />
        </div>
    );
}