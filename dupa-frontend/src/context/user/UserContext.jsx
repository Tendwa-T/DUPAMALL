"use client"

import { createContext, useState } from "react"

export const UserContext = createContext();

export function UserProvider({ children }) {
    const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        contact: "",
    })

    const [products, setProducts] = useState([])

    async function userLogin(email, password) {
        try {
            const res = await fetch(`${baseURL}/${process.env.NEXT_PUBLIC_LOGIN_ENDPOINT}`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            })
            const resBod = await res.json();
            if (resBod.code === 1) {
                setUser({
                    _id: resBod.userdetails.seller_id,
                    fname: resBod.userdetails.seller_fname,
                    lname: resBod.userdetails.seller_lname,
                    email: resBod.userdetails.seller_email,
                    contact: resBod.userdetails.seller_contact,
                })
            }
            return {
                message: `${resBod.message}`,
                success: resBod.code === 0 ? false : true,
            }
        } catch (err) {
            console.log(err)
            return
        }
    }

    async function fetchProducts() {
        try {
            const res = await fetch(`${baseURL}/read.php`)
            const resBod = await res.json()
            setProducts(resBod)
        } catch (err) {
            console.log(err)
            return
        }
    }

    async function addProduct({ name, description, price, quantity, type, imgUrl, seller_id }) {
        try {
            const res = await fetch(`${baseURL}/create.php`, {
                method: 'POST',
                body: JSON.stringify({
                    product_name: name,
                    product_description: description,
                    product_price: price,
                    product_quantity: quantity,
                    product_type: type,
                    product_image: imgUrl,
                    seller_id: seller_id
                })
            })
            const resBod = await res.json()
            await fetchProducts()
            console.log(resBod)
            return {
                message: `${resBod.message}`,
                success: resBod.code === 0 ? false : true,
            }
        } catch (err) {
            console.log(err)
            return
        }
    }

    async function updateProduct({ id, name, description, price, quantity, type, imgUrl }) {
        try {
            const res = await fetch(`${baseURL}/update.php/${encodeURIComponent(id)}`, {
                method: 'PUT',
                body: JSON.stringify({
                    product_name: name,
                    product_description: description,
                    product_price: price,
                    product_quantity: quantity,
                    product_type: type,
                    product_image: imgUrl,
                    seller_id: user._id
                })
            })
            const resBod = await res.json()
            console.log(resBod)
            return {
                message: `${resBod.message}`,
                success: resBod.code === 0 ? false : true,
            }
        } catch (err) {
            console.log(err)
            return
        }
    }

    async function deleteProduct(id) {
        try {
            const res = await fetch(`${baseURL}/delete.php/${id}`, {
                method: 'DELETE',
            })
            const resBod = await res.json()
            await fetchProducts()
            console.log(resBod)
            return {
                message: `${resBod.message}`,
                success: resBod.code === 0 ? false : true,
            }
        } catch (err) {
            console.log(err)
            return
        }
    }

    async function userRegister(
        firstname,
        lastname,
        email,
        phone,
        password,
        confirmpassword,
    ) {
        try {
            const res = await fetch(`${baseURL}/register.php`, {
                method: 'POST',
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    phone,
                    password,
                    confirmpassword,
                })
            })
            const resBod = await res.json()

            return {
                message: `${resBod.message}`,
                success: resBod.code === 0 ? false : true,
            }

        } catch (err) {
            console.log(err)
            return
        }
    }
    const value = {
        user,
        userLogin,
        userRegister,
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        fetchProducts
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}