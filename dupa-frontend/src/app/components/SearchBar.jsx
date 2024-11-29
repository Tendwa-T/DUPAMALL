"use client"

import { Search } from "@mui/icons-material"
import { Box, Button, CircularProgress, Divider, InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from "react"

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [results, setResults] = useState([])

    async function handleSearch(e) {
        setLoading(true)
        e.preventDefault()
        try {
            if (query.trim() !== '') {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/read_prod_by_name.php`, {
                    method: 'POST',
                    body: JSON.stringify({ product_name: query })
                })
                const data = await res.json()
                console.log(data)
                if (data.success) {
                    setResults(data.data)
                    setSuccess(true)
                }
                else {
                    setResults()
                    setSuccess(false)
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            console.log(results)
        }

    }



    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
                <TextField
                    size="small"
                    sx={{ width: { xs: '5em', sm: '15em', md: '30em' }, bgcolor: 'whitesmoke' }}
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">
                                <Search /> <Divider orientation="vertical" flexItem sx={{ mx: '0.5em' }} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <Button onClick={handleSearch}>Search</Button>
                            </InputAdornment>
                        },
                    }}
                />
            </Box>
            {loading ?
                <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: 1, bgcolor: 'white', width: '30em', mt: '2em', boxShadow: 2 }}>
                    <CircularProgress />
                </Box>
                : results && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: 1, bgcolor: 'white', width: '30em', mt: '2em', boxShadow: 2 }}>
                        {results.map((result) => (
                            <Box key={result.product_id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0.5em', borderBottom: '1px solid lightgrey' }}>
                                <Box>
                                    <img src={result.product_image} alt={result.name} width={50} height={50} />
                                </Box>
                                <Box>
                                    <p>{result.product_name}</p>
                                    <p>{result.product_price}</p>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                )}
            {/* results && query.trim() !== '' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, bgcolor: 'white', width: '30em', mt: '2em', boxShadow: 2 }}>
                    <Typography>
                        No results found
                    </Typography>
                </Box>
            ) */}
            <Typography>Hey There</Typography>

        </Box>
    )
}