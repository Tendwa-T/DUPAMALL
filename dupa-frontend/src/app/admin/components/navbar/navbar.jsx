"use client"
import { Search } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, InputAdornment, Link, TextField, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function NavBarComponent(selected) {
    const selectedItem = selected.selected

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component={'nav'} sx={{ bgcolor: '#024023', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <Toolbar >
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'white', fontFamily: 'serif', fontWeight: 'bold', fontSize: '2em' }}>
                            DUPA MALL
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">
                                Admin Panel
                            </Typography>

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} />
                    </Box>

                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    )
}