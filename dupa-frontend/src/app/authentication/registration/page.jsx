"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Grid2, IconButton, InputAdornment, Slide, Snackbar, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { NextResponse } from "next/server";
import { useState } from "react";
import { useUser } from "@/context/user/useUser";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password, setPassword] = useState("");
    const { userRegister } = useUser();
    const [vis, setVis] = useState(false)
    const [snack, setSnack] = useState({
        open: false,
        message: "Default message",
        success: null,
        transition: SlideTransition(),
    });

    function showPassword() {
        setVis(!vis)
    }

    function handleSubmit(e) {
        if (e.id == "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handleFName(e) {
        setFirstName(e.target.value);
    }
    function handleLName(e) {
        setLastName(e.target.value)
    }
    function handlePhone(e) {
        setPhone(e.target.value)
    }
    function handleConfirm(e) {
        setConfirmpassword(e.target.value)
    }

    function handleClick(mes, success) {
        setSnack({
            open: true,
            message: mes,
            success,
        });
    }

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }

    function handleClose() {
        setSnack({
            ...snack,
            open: false,
        });
    }
    async function contactServer() {
        setLoading(true);
        try {
            const res = await userRegister(firstName, lastName, email, phone, password, confirmpassword);
            if (res.success) {
                handleClick(res.message, true)
                router.push("/authentication/login");
            } else {
                handleClick(res.message, false);
            }

            return NextResponse.json({
                message: res.message,
                success: res.success
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Box sx={{ display: 'flex', bgcolor: "#024023", color: 'white' }}>
            <Grid2 container sx={{ width: '100vw', height: '100vh' }}>
                <Grid2 size={5} display={{ sm: 'none', md: 'block' }} >
                    <Box sx={{ bgcolor: "#f3f1ed", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={"/images/svgs/login.svg"}
                            alt="Login Vector Image"
                            width={800}
                            height={800}
                        />
                    </Box>
                </Grid2>
                <Grid2 size={7}>

                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', p: '2em' }} >
                        <Typography variant="h4" sx={{ bgcolor: 'transparent' }}>
                            DUPA MALL
                        </Typography>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', width: '100%', border: 1, borderRadius: '2em', p: '2em', color: 'white'
                        }}>
                            <Typography textAlign={"center"} variant="h6">
                                Registration
                            </Typography>
                            <Box
                                component={"form"}
                                sx={{ m: 1, color: 'white' }}
                            >
                                <Box sx={{ display: 'flex' }}>
                                    <TextField
                                        name="firstname"
                                        id="firstname"
                                        type="text"
                                        className="border-black fill-black"
                                        label="First Name"
                                        onBlur={handleFName}
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Default border color
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#E8B931", // Border color on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#E8B931", // Border color when focused
                                                }
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                style: { color: 'white', },
                                            },
                                            inputLabel: {
                                                style: { color: 'white' }
                                            },
                                        }}
                                    />
                                    <Box sx={{ width: '2em' }} />
                                    <TextField
                                        name="lastname"
                                        id="lastname"
                                        type="text"
                                        onBlur={handleLName}
                                        label="Last Name"
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Default border color
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#E8B931", // Border color on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#E8B931", // Border color when focused
                                                }
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                style: { color: 'white', },
                                            },
                                            inputLabel: {
                                                style: { color: 'white' }
                                            },
                                        }}

                                    />
                                </Box>
                                <Box sx={{ display: 'flex', py: '1em' }}>
                                    <TextField
                                        name="email"
                                        id="email"
                                        type="email"
                                        className="border-black fill-black"
                                        label="Email"
                                        onBlur={handleEmail}
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Default border color
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#E8B931", // Border color on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#E8B931", // Border color when focused
                                                }
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                style: { color: 'white', },
                                            },
                                            inputLabel: {
                                                style: { color: 'white' }
                                            },
                                        }}
                                    />
                                    <Box sx={{ width: '2em' }} />
                                    <TextField
                                        name="phone"
                                        id="phone"
                                        type="tel"
                                        onBlur={handlePhone}
                                        label="Phone"
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Default border color
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#E8B931", // Border color on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#E8B931", // Border color when focused
                                                }
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                style: { color: 'white', },
                                            },
                                            inputLabel: {
                                                style: { color: 'white' }
                                            },
                                        }}

                                    />
                                </Box>
                                <Box sx={{ display: 'flex', py: '1em' }}>
                                    <TextField
                                        name="password"
                                        id="password"
                                        type={vis ? "text " : "password"}
                                        onBlur={handleSubmit}
                                        label="Password"
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Default border color
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#E8B931", // Border color on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#E8B931", // Border color when focused
                                                }
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                style: { color: 'white', },
                                                endAdornment: <InputAdornment>
                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        onClick={showPassword}
                                                    >
                                                        {vis ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            },
                                            inputLabel: {
                                                style: { color: 'white' }
                                            },
                                        }}

                                    />
                                    <Box sx={{ width: '2em' }} />
                                    <TextField
                                        name="confpassword"
                                        id="confpassword"
                                        type={vis ? "text " : "password"}
                                        onBlur={handleConfirm}
                                        label="Confirm Password"
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "white", // Default border color
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#E8B931", // Border color on hover
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#E8B931", // Border color when focused
                                                }
                                            }
                                        }}
                                        slotProps={{
                                            input: {
                                                style: { color: 'white', },
                                                endAdornment: <InputAdornment>
                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        onClick={showPassword}
                                                    >
                                                        {vis ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            },
                                            inputLabel: {
                                                style: { color: 'white' }
                                            },
                                        }}

                                    />
                                </Box>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', mt: '2em' }}>
                                    <Button
                                        sx={{ color: '#E8B931', width: 'white' }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="contained"
                                        sx={{ bgcolor: '#E8B931', width: '10em' }}
                                        onClick={contactServer}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress color="white" size={24} /> : "Register"}
                                    </Button>
                                </Box>

                            </Box>

                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
            <Snackbar
                open={snack.open}
                onClose={handleClose}
                TransitionComponent={snack.Transition}
                key={"Reg-Snack"}
                autoHideDuration={1200}
            >
                <Alert
                    onClose={handleClose}
                    severity={snack.success ? "success" : "error"}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box >

    )
}