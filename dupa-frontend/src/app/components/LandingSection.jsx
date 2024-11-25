/* eslint-disable @next/next/no-img-element */
import { Box, Button, Grid2, Toolbar, Typography } from "@mui/material";

export default function LandingSection() {
    return (

        <Box sx={{ display: 'flex', mt: '5em', width: '100vw', px: '5em' }}>
            <Grid2 container justifyContent={'center'} sx={{ width: '100vw', }}>
                <Grid2 size={5} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h3" textAlign={'left'} sx={{ fontFamily: 'sans-serif', fontSize: { xs: '1.5em', md: '2em', lg: '3em' }, fontWeight: '400', color: '#02542D' }}>
                            Connect, Create, and Trade: Your Campus Marketplace for Student-Made Creations
                        </Typography>
                        <Button sx={{ mt: '2em', bgcolor: "#E8B931", width: '15em', alignSelf: 'flex-start' }} variant="contained">
                            GET STARTED
                        </Button>
                    </Box>

                </Grid2>
                <Grid2 size={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src="/images/landingPage.png"
                        width={550}
                        alt="Generic Shopping Cart Image"
                    />
                </Grid2>
            </Grid2>
        </Box>

    )
}