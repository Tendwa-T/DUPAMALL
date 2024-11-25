'use client'

import { ArrowBack, ArrowForward, ArrowRight, Category } from "@mui/icons-material"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import Slider from "react-slick";


function PrevArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "flex", backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', marginRight: '300px' }}
            onClick={onClick}
        />

    )
}

function NextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "flex", backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}
            onClick={onClick}
        />

    )
}


export default function PreviewsComponent() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />

    };


    const categories = [
        {
            id: 0,
            name: 'Electronics',
            img: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
            route: '/products/electronics'
        },
        {
            id: 1,
            name: 'Jewelery',
            img: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
            route: '/products/jewelery'
        },
        {
            id: 2,
            name: `Men's clothing`,
            img: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
            route: '/products/clothes-men'
        },
        {
            id: 3,
            name: `Women's clothing`,
            img: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
            route: '/products/clothes-women'
        },

    ]



    return (
        <>

            <Box sx={{ my: '5em', px: '5em' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Category sx={{ mr: '0.5em', color: '#02542D' }} fontSize="large" />
                        <Typography variant={'h5'}>
                            Top Categories
                        </Typography>
                    </Box>

                </Box>
                <Box className="slider-container" sx={{ my: '2em' }}>
                    < Slider {...settings} >
                        {categories.map((cat) => (
                            <Card key={cat.id}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={cat.name}
                                        sx={{ height: '10em', p: '1em', objectFit: 'contain' }}
                                        image={cat.img}
                                    />
                                    <CardContent>
                                        <Typography>
                                            {cat.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        ))}
                    </Slider>

                </Box>
            </Box >
        </>
    )
}