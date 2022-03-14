import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridColDef, gridNumberComparator, GridValueGetterParams} from "@mui/x-data-grid";
import {Box, Input, Stack, TextField, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {updateExchangeRate} from "../app/accountSlice";

import gold from "../assets/currencies/gold.png"
import crystals from "../assets/currencies/crystals.png"
import {useTheme} from "@mui/material/styles";


function calculateGoldCost(exchangeRate: number) {
    return exchangeRate / 95
}

function ExchangeComponent() {

    const dispatch = useDispatch()
    const exchangeRate: number = useSelector((state: RootState) => state.persistedReducer.exchangeRate)

    return (
        <Box>

        <Input value={exchangeRate} placeholder="1000"
               onChange={(event) => dispatch(updateExchangeRate(parseInt(event.target.value)))}/>
        </Box>
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
    bundleSize: number = 1,
) {
    return {
        image,
        id,
        amount,
        cost,
        bundleSize
    };
}

const rowData = [
    // Tier 1
    createData("https://lostarkcodex.com/icons/use_7_169.webp", "Star's breath", 10, 30),
    createData("https://lostarkcodex.com/icons/use_8_251.webp", "Guardian stone fragment", 800, 72, 10),
    createData("https://lostarkcodex.com/icons/use_8_250.webp", "Destruction stone fragment", 300, 120, 10),
    createData("https://lostarkcodex.com/icons/use_8_231.webp", "Harmony shard pouch (S)", 5, 23),
    createData("https://lostarkcodex.com/icons/use_8_232.webp", "Harmony shard pouch (M)", 15, 141),
    createData("https://lostarkcodex.com/icons/use_10_25.webp", "Harmony leapstone ", 30, 30),
    // Tier 2
    createData("https://lostarkcodex.com/icons/use_7_16.webp", "Guardian stone", 800, 160, 10),
    createData("https://lostarkcodex.com/icons/use_7_15.webp", "Destruction stone", 300, 167, 10),
    createData("https://lostarkcodex.com/icons/use_8_229.webp", "Life shard pouch (S)", 10, 38),
    createData("https://lostarkcodex.com/icons/use_10_24.webp", "Life leapstone", 40, 56),
    createData("https://lostarkcodex.com/icons/use_7_167.webp", "Moon's breath", 5, 30),
    createData("https://lostarkcodex.com/icons/use_9_69.webp", "Caldarr fusion material", 10, 70),
    // Tier 3
    createData("https://lostarkcodex.com/icons/use_6_104.webp", "Guardian stone crystal", 800, 240, 10),
    createData("https://lostarkcodex.com/icons/use_6_105.webp", "Destruction stone crystal", 300, 240, 10),
    createData("https://lostarkcodex.com/icons/use_8_225.webp", "Honor shard pouch (S)", 10, 56),
    createData("https://lostarkcodex.com/icons/use_7_155.webp", "Honor leapstone", 10, 20),
    createData("https://lostarkcodex.com/icons/use_7_156.webp", "Great Honor leapstone", 5, 50),
    createData("https://lostarkcodex.com/icons/use_7_161.webp", "Solar grace", 20, 80),
    createData("https://lostarkcodex.com/icons/use_7_162.webp", "Solar blessing", 15, 150),
    createData("https://lostarkcodex.com/icons/use_7_163.webp", "Solar protection", 3, 150),
    createData("https://lostarkcodex.com/icons/use_9_70.webp", "Simple Oreha fusion material", 10, 30),
    createData("https://lostarkcodex.com/icons/use_9_71.webp", "Basic Oreha fusion material", 10, 40),
];


export default function MarisShop() {

    const exchangeRate: number = useSelector((state: RootState) => state.persistedReducer.exchangeRate)

    const columns: GridColDef[] = [
        {
            field: 'image',
            headerName: 'Item',
            width: 70,
            sortable: false,
            renderCell: (params) => <img height="80%" width="80%" src={params.value} alt={""}/>
        },
        {
            field: 'id',
            headerName: '',
            width: 250,
            sortComparator: gridNumberComparator
        },
        {
            field: 'cost',
            headerName: 'Cost',
            width: 100,
            renderHeader: (props) => {
                return (
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Box
                            component="img"
                            sx={{
                                marginRight: 1,
                                height: 22,
                                width: 22,
                            }}
                            src={crystals}
                        />
                        <Typography fontSize={15}>Cost</Typography>
                    </Stack>
                )
                    ;
            },
            sortComparator: gridNumberComparator
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 100,
            sortComparator: gridNumberComparator
        },
        {
            field: 'goldCost',
            headerName: 'Gold Cost',
            width: 100,
            renderHeader: (props) => {
                return (
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Box
                            component="img"
                            sx={{
                                marginRight: 1,
                                marginTop: 0.5,
                                height: 16,
                                width: 16,
                            }}
                            src={gold}
                        />
                        <Typography fontSize={15}>Cost</Typography>
                    </Stack>
                )
                    ;
            },
            sortComparator: gridNumberComparator,
            valueGetter: (params: GridValueGetterParams) =>
                `${Math.round(params.row.cost * calculateGoldCost(exchangeRate))}`,
        },
        {
            field: 'goldCostEach',
            headerName: 'Each',
            description: "Gold cost per each bundle (Guardian stones sell in bundles of 10)",
            width: 80,
            sortComparator: gridNumberComparator,
            renderHeader: (props) => {
                return (
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Box
                            component="img"
                            sx={{
                                marginRight: 1,
                                marginTop: 0.5,
                                height: 16,
                                width: 16,
                            }}
                            src={gold}
                        />
                        <Typography fontSize={15}>Each</Typography>
                    </Stack>
                )
                    ;
            },
            valueGetter: (params: GridValueGetterParams) =>
                `${Math.round(((params.row.cost * calculateGoldCost(exchangeRate)) / params.row.amount) * params.row.bundleSize)}`,
        },
    ];


    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<any[]>(rowData);
    const theme = useTheme()

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
            <ExchangeComponent/>
            <DataGrid
                sx={{
                    '& .MuiDataGrid-iconSeparator': {
                        display: 'none',
                    },
                    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                        borderRight: `1px solid ${
                            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
                        }`,
                    },
                    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                        borderBottom: `1px solid ${
                            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
                        }`,
                    },
                    '& .MuiDataGrid-cell': {
                        color:
                            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
                    },
                }}
                disableColumnFilter
                disableColumnMenu
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