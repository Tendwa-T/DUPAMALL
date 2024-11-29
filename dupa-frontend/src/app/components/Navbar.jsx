"use client"
import { Search } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, InputAdornment, Link, TextField, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function NavBarComponent(selected) {
    const selectedItem = selected.selected
    const router = useRouter()

    const options = [
        {
            key: 0,
            name: 'Home',
            route: '/',
        },
        {
            key: 1,
            name: 'Products',
            route: '/products',
        },

    ]
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component={'nav'} sx={{ bgcolor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: "#024023", justifyContent: 'center' }}>
                    <Typography textAlign={'center'} fontSize={'1em'}>Would you like to sell your Items / Services?{" "}<Link sx={{ color: "#E8B931" }} href="/authentication/login"> Click here</Link></Typography>
                </Box>
                <Toolbar >
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: '#024023', fontFamily: 'serif', fontWeight: 'bold', fontSize: '2em' }}>
                            DUPA MALL
                        </Typography>
                        {/* Add Search bar */}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {options.map((op) => (
                                <Button key={op.key} sx={{ color: op.key === selectedItem ? "#E8B931" : "#024023" }} onClick={() => router.push(op.route)}>
                                    {op.name}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    )
}