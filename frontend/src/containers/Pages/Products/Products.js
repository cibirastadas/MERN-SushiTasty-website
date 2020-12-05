import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from "axios"
import ProductDisplay from "../../../components/ProductDisplay/ProductDisplay"
import PageCovers from '../../../components/PageCovers/PageCovers'
import classes from "./Products.module.css"
import ProductMeniu from '../../../components/Pages/Products/ProductMeniu/ProductMeniu'

const Products = ({data}) => {

    const [products, setProducts] = useState([])
    const location = useLocation();

    useEffect(()=>{
        axios.get("https://sushifresh-backend.herokuapp.com" + location.pathname).then(response=>setProducts(response.data))
    },[location.pathname])

    const allProducts = products.map(item=> <ProductDisplay key={item._id} data={item}/>)

    return (
        <div>
            <PageCovers cName={data}>{data.title}</PageCovers>
            <div className={classes.content}>
                <ProductMeniu/>
                <div className={classes.products}>
                    {allProducts}
                </div>
                
            </div>
        </div>
      
    )
}
export default Products