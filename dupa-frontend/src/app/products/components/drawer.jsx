"use client"
import CssBaseline from "@mui/material/CssBaseline";
import { Inbox, Mail } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import NavBarComponent from "@/app/components/Navbar";

export default function ProductDrawer({ data }) {
    const drawerWidth = 240;


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <NavBarComponent selected={1} />
            {/*  <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar sx={{ mt: '2em' }} />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox /> : <Mail />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox /> : <Mail />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer> */}
            <Box component="main" sx={{ flexGrow: 1, mt: '2em' }}>
                <Toolbar sx={{ mt: '1em' }} />
                {data}
            </Box>
        </Box>
    )
}