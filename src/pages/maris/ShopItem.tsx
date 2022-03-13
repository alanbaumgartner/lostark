import {Box, Stack, Typography} from "@mui/material";

export interface ShopItem {
    name: string,
    cost: number,
    amount: number,
    image: string,
}

export default function ShopItemComponent(shopItem: ShopItem) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Stack>
                <Typography>{shopItem.name}</Typography>
                <Typography>{shopItem.cost}</Typography>
                <Typography>{shopItem.amount}</Typography>
                <img src={shopItem.image} />
            </Stack>
        </Box>
    );
}