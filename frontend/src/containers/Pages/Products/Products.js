import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../axios/axiosInstance";
import ProductDisplay from "../../../components/ProductDisplay/ProductDisplay";
import PageCovers from "../../../components/PageCovers/PageCovers";
import classes from "./Products.module.css";
import ProductMeniu from "../../../components/Pages/Products/ProductMeniu/ProductMeniu";
import { productData } from "../../../components/Pages/Admin/Products/ProductData/ProductData";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

const Products = () => {
  const foundActiveProduct = () => {
    return productData.find((product) => product.path === location.pathname);
  };
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(() =>
    foundActiveProduct()
  );
  useEffect(() => {
    setActiveProduct(
      productData.find((product) => product.path === location.pathname)
    );
  }, [location]);
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/categories").then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      <div>
        <PageCovers cName={activeProduct}>{activeProduct.title}</PageCovers>
        <div className={classes.content}>
          <ProductMeniu />
          <div className={classes.products}>
            {products.length > 0 &&
              location.pathname === "/products" &&
              products.map((product) =>
                product.products.map((x) => {
                  return <ProductDisplay key={x._id} data={x} />;
                })
              )}
            {products.length > 0 &&
              products
                .find((item) => item.path === location.pathname)
                ?.products.map((product) => (
                  <ProductDisplay key={product._id} data={product} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
