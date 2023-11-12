//Imports
import "./css/App.css";
import React, { useEffect, useState } from "react";
import { FetchGetService } from "./services/FetchService";
import { FetchPostService } from "./services/FetchService";
import { GET_CATEGORIES, GET_ORDERS, GET_PRODUCTS } from "./utils/Urls";
import ProductTable from "./components/ProductTable";
import TopNavBar from "./components/TopNavBar";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";

function App() {
    //need full explanation for this part actualy
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await FetchGetService(GET_PRODUCTS);
                setProducts(result);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const result = await FetchGetService(GET_CATEGORIES);
                setCategories(result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <div className="App">
            <TopNavBar />
            <header className="App-header">
                <div className="row">
                    <div className="col-md-12">
                        <Routes>
                            <Route path="/" element={<ProductTable products={products} categories={categories} />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
