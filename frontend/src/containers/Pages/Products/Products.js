import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../axios/axiosInstance";
import ProductDisplay from "../../../components/ProductDisplay/ProductDisplay";
import PageCovers from "../../../components/PageCovers/PageCovers";
import classes from "./Products.module.css";
import ProductMeniu from "../../../components/Pages/Products/ProductMeniu/ProductMeniu";
import { productData } from "../../../components/Pages/Admin/Products/ProductData/ProductData";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import Pagination from "../../../components/Pagination/Pagination";
import ResponseModal from "../../../components/Modals/ResponseModal";
const Products = () => {
  const foundActiveProduct = () => {
    return productData.find((product) => product.path === pathname);
  };
  const { pathname, search } = useLocation();
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(() =>
    foundActiveProduct()
  );

  const [productsData, setProducstData] = useState(() => productData);
  const [paginationNavigation, setPaginationNavigation] = useState({});
  useEffect(() => {
    if (productsData[1].categoryId) {
      return;
    }
    setLoading(true);
    axios.get("http://localhost:5000/categories/names").then((resp) => {
      setProducstData(
        productsData.map((product) => {
          const category = resp.data.find(
            (el) => el.name === product.title
          )?.value;
          if (category) {
            return { ...product, categoryId: category };
          }
          return product;
        })
      );
    });
  }, [pathname, productsData]);
  const handleOpenResponseModal = () => {
    setIsResponseModal((prev) => !prev);
  };
  useEffect(() => {
    if (!productsData[1].categoryId) {
      return;
    }
    setLoading(true);
    const selectedProduct = productsData.find(
      (product) => product.path === pathname
    );
    const query = search ? search + `&limit=12` : "?page=1&limit=12";
    const categoryParam = selectedProduct.categoryId
      ? `/${selectedProduct.categoryId}`
      : "";
    setActiveProduct(selectedProduct);
    axios
      .get("http://localhost:5000/products" + categoryParam + query)
      .then((resp) => {
        setPaginationNavigation(resp.data.paginationNavigation);
        setProducts(resp.data.results);
        setLoading(false);
      });
  }, [search, productsData, pathname]);
  return (
    <>
      {loading ? (
        <LoadingScreen loading={loading} />
      ) : (
        <div>
          <PageCovers cName={activeProduct}>{activeProduct.title}</PageCovers>
          <ResponseModal
            onClose={handleOpenResponseModal}
            open={isResponseModal}
            btnAction={handleOpenResponseModal}
            bodyText="Prisijunkite, kad galėtumėt pridėti produktą į krepšelį"
          />
          <div className={classes.content}>
            <ProductMeniu />
            <Pagination paginationNavigation={paginationNavigation} />
            <div className={classes.products}>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductDisplay
                    key={product._id}
                    data={product}
                    handleOpenResponseModal={handleOpenResponseModal}
                  />
                ))}
            </div>
            <Pagination paginationNavigation={paginationNavigation} />
          </div>
        </div>
      )}
    </>
  );
};
export default Products;
