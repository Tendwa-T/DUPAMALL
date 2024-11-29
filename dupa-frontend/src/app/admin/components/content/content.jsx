"use client"

import { ArrowDropDown, Delete, Edit } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Drawer, Grid2, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddProduct from "../forms/products/addProducts";
import { useUser } from "@/context/user/useUser";
import Image from "next/image";

export default function PageContent() {


    const drawerWidth = 240;
    const [selected, setSelected] = useState(0)



    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{

                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem key={'product'} disablePadding >
                            <ListItemButton sx={{ color: selected == 0 ? 'green' : 'inherit' }} onClick={() => {
                                setSelected(0)
                            }}>
                                <ListItemText primary={"Product"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'profile'} disablePadding>
                            <ListItemButton sx={{ color: selected == 1 ? 'green' : 'inherit' }} onClick={() => {
                                setSelected(1)
                            }}>
                                <ListItemText primary={"Profile"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Box>

                    {selected == 0 ? <ProductContent /> : <ProfileContent />}
                </Box>
            </Box>
        </Box>
    )
}

function ProductContent() {
    const { products, fetchProducts, deleteProduct } = useUser()
    let ksh = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KSH'
    })


    useEffect(() => {
        fetchProducts()
    }, [])

    function EditProductForm(product) {
        const [openModal, setOpenModal] = useState(false)
        const { updateProduct, fetchProducts } = useUser()
        const toggleModal = () => {
            setOpenModal(!openModal)
        }

        return (
            <>
                <IconButton
                    onClick={toggleModal}

                >
                    <Edit />
                </IconButton>
                <Dialog
                    open={openModal}
                    onClose={toggleModal}
                    PaperProps={{
                        component: 'form',
                        sx: { width: '100%', maxWidth: '500px' },
                        onSubmit: async (event) => {
                            event.preventDefault()
                            const formData = new FormData(event.currentTarget)
                            const formJson = Object.fromEntries(formData.entries())
                            const { id, name, description, price, quantity, type, imgUrl } = formJson;
                            await updateProduct({ id, name, description, price, quantity, type, imgUrl })
                            toggleModal()
                            await fetchProducts()

                        },
                    }}
                >
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent sx={{ p: '1em' }}>
                        <Box sx={{ my: '1' }}>
                            <TextField
                                name="id"
                                label="Product ID"
                                defaultValue={product.product_id}
                                fullWidth
                                disabled

                            />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <TextField
                                name="name"
                                label="Product Name"
                                defaultValue={product.product_name}
                                fullWidth
                            />
                            <TextField
                                name="description"
                                label="Product Description"
                                defaultValue={product.product_description}
                                fullWidth
                            />
                        </Box>

                        <TextField
                            name="price"
                            label="Price"
                            defaultValue={product.product_price}
                            fullWidth
                        />
                        <TextField
                            name="quantity"
                            label="Quantity"
                            defaultValue={product.product_quantity}
                            fullWidth
                        />
                        <TextField
                            name="type"
                            label="Type"
                            defaultValue={product.product_type}
                            fullWidth
                        />
                        <TextField
                            name="imgUrl"
                            label="Image URL"
                            defaultValue={product.product_image}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex' }}>
                            <Button onClick={toggleModal}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </Box>

                    </DialogContent>

                </Dialog>

            </>
        )
    }
    return (
        <Box>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ArrowDropDown />}>
                    <Typography variant="h4">
                        Products
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "flex-end",
                        }}
                    >
                        <AddProduct />
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Price per Unit</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((prod, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{prod.product_name}</TableCell>
                                        <TableCell align="center"><Image src={prod.product_image} alt={prod.product_image} width={200} height={200} /></TableCell>
                                        <TableCell align="center">{ksh.format(prod.product_price)}</TableCell>
                                        <TableCell align="center">{prod.product_type}</TableCell>
                                        <TableCell align="center">{prod.product_quantity}</TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <IconButton onClick={() => {
                                                    deleteProduct(prod.product_id)
                                                }}>
                                                    <Delete />
                                                </IconButton>
                                                <Box sx={{ width: '0.5em' }} />
                                                <EditProductForm {...prod} />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

function ProfileContent() {
    const { user } = useUser()

    let ksh = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KSH'
    })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <Paper sx={{ padding: 2, borderRadius: 2, }}>
                <Typography variant="h4">
                    Personal Info
                </Typography>
                <Grid2 container padding={2}>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Full Name:
                        </Typography>
                        <Typography variant="body2">
                            {user.fname} {user.lname}
                        </Typography>
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Email:
                        </Typography>
                        <Typography variant="body2">
                            {user.email}
                        </Typography>
                    </Grid2>
                    <Grid2 size={4} padding={1}>
                        <Typography variant="h5">
                            Contact
                        </Typography>
                        <Typography variant="body2">
                            {user.contact}
                        </Typography>

                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    )
}
