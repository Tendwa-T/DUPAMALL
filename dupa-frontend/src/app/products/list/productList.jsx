"use client"

import { useUser } from "@/context/user/useUser"
import { Add } from "@mui/icons-material"
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ProductList() {
    const { products, fetchProducts } = useUser()
    const [loading, setLoading] = useState(true)
    console.log(products)

    let ksh = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KSH'
    })


    useEffect(() => {
        fetchProducts()
        setLoading(false)
    }, [])

    function ProductDetails(product) {
        const [openModal, setOpenModal] = useState(false)
        const toggleModal = () => {
            setOpenModal(!openModal)
        }


        return (
            <>
                <Button
                    onClick={toggleModal}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                >
                    <Add />
                    View Details
                </Button>
                <Dialog
                    open={openModal}
                    onClose={toggleModal}
                    PaperProps={{
                        component: 'form',
                        sx: { p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '2em', width: '200em' }
                    }}
                >

                    <DialogTitle>
                        Product Details
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {product.product_name}
                        </DialogContentText>
                    </DialogContent>
                    <Box sx={{
                        display: 'flex', px: 2, justifyContent: 'space-around', alignItems: 'center', width: '100%'
                    }}>
                        <Image src={product.product_image} alt={product.product_name} width={250} height={250} />
                        <Typography sx={{ px: '1em' }}>
                            {product.product_description}
                        </Typography>
                    </Box>

                    <DialogActions>
                        <Button variant="outlined"
                            onClick={toggleModal}
                        >Cancel</Button>
                        <Button variant="contained" type="submit">Contact</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    return (
        <>
            <Typography variant="h5">
                All Products
            </Typography>
            {loading ? <Box
                sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center' }}
            ><CircularProgress /></Box> : (
                <Grid2 container justifyContent={"center"}>
                    {products.map((product) => (
                        <Grid2 key={product.product_id} size={'auto'}>
                            <Card sx={{ maxWidth: 345, height: 450, m: '1em', p: '1em', justifyContent: 'center', alignItems: "center" }}>
                                <CardMedia
                                    component="img"
                                    image={product.product_image}
                                    alt={product.product_name}
                                    sx={{ height: 200, width: 300 }}
                                />
                                <CardContent sx={{ p: '1em' }}>
                                    <CardHeader title={product.product_name} subheader={ksh.format(product.product_price)} />
                                    <Typography variant="body2" color="text.secondary">
                                        {product.product_description}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <ProductDetails {...product} />
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </>
    )
}
