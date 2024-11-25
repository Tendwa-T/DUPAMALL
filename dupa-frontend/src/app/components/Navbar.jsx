import { Search } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, InputAdornment, Link, TextField, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function NavBarComponent(selected) {
    const selectedItem = selected.selected

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
        {
            key: 2,
            name: 'Profile',
            route: '/profile'
        }
    ]
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component={'nav'} sx={{ bgcolor: 'white' }} >
                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: "#024023", justifyContent: 'center' }}>
                    <Typography textAlign={'center'}>Would you like to sell your Items / Services?{" "}<Link sx={{ color: "#E8B931" }}> Click here</Link></Typography>
                </Box>
                <Toolbar >
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: '#024023', fontFamily: 'serif', fontWeight: 'bold', fontSize: '2em' }}>
                            DUPA MALL
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                size="small"
                                sx={{ width: '30em', bgcolor: 'whitesmoke' }}
                                placeholder="Search"
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">
                                            <Search /> <Divider orientation="vertical" flexItem sx={{ mx: '0.5em' }} />
                                        </InputAdornment>
                                    },
                                }}
                            />

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {options.map((op) => (
                                <Button key={op.key} sx={{ color: op.key === selectedItem ? "#E8B931" : "#024023" }}>
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