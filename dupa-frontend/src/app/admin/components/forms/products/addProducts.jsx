"use client"
import { useUser } from "@/context/user/useUser";
import { Add } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function AddProduct() {
    const { user, addProduct } = useUser()
    const [openModal, setOpenModal] = useState(false)
    const [imgUrl, setImgUrl] = useState()
    const toggleModal = () => {
        setOpenModal(!openModal)
    }


    const handleUpload = (result) => {
        if (result.event === 'success') {
            setImgUrl(result.info.secure_url); // Retrieve the URL
        }
    };

    return (
        <>
            <Button
                onClick={toggleModal}
                variant="contained"
                sx={{ borderRadius: 2, bgcolor: "#024023", my: '1em' }}
            >
                <Add />
                Add Product
            </Button>
            <Dialog
                open={openModal}
                onClose={toggleModal}
                PaperProps={{
                    component: 'form',
                    sx: { width: '100em' },
                    onSubmit: async (event) => {
                        event.preventDefault()
                        const formData = new FormData(event.currentTarget)
                        const formJson = Object.fromEntries(formData.entries())
                        const { name, description, price, quantity, type, } = formJson;
                        await addProduct({ name, description, price, quantity, type, imgUrl, seller_id: user._id })
                    },
                }}
            >

                <DialogTitle>
                    Add a Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use this form to enter data for the new Product
                    </DialogContentText>
                </DialogContent>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', m: '1em' }}>
                    {imgUrl && <Image className="p-4" src={imgUrl} width={500} height={200} alt="product" />}

                    <CldUploadButton
                        className="bg-[#024023] text-white w-[10em] p-2 rounded-md"
                        uploadPreset="dp_mall"
                        onSuccess={handleUpload}
                    />

                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name='name'
                        label='Product Name'
                        type='text'
                        fullWidth

                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name='description'
                        label='Product Description'
                        type='text'
                        fullWidth
                        multiline
                    />
                </Box>
                <Box sx={{ display: 'flex', px: 2 }}>

                    <TextField
                        required
                        margin="dense"
                        id="price"
                        name='price'
                        label='Product Price'
                        type='number'
                        fullWidth
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="quantity"
                        name='quantity'
                        label='Quantity'
                        type='number'
                        fullWidth
                    />
                    <Box sx={{ width: '3em' }} />
                    <TextField
                        required
                        margin="dense"
                        id="type"
                        name='type'
                        label='Product Type'
                        type='text'
                        fullWidth
                    />
                </Box>

                <DialogActions>
                    <Button variant="outlined"
                        onClick={() => {
                            setOpenModal(false)
                            setImgUrl()

                        }}

                    >Cancel</Button>
                    <Button variant="contained" type="submit" sx={{ bgcolor: '#024023' }}>Add</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}