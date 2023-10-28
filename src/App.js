
//Imports
import './css/App.css';
import React, {useEffect, useState} from 'react';
import {FetchGetService} from "./services/FetchService";
import {FetchPostService} from "./services/FetchService";
import {GET_CATEGORIES, GET_ORDERS, GET_PRODUCTS} from "./utils/Urls"
import ProductTable from "./components/ProductTable";
// import Cart from "./components/Cart";
import TopNavBar from "./components/TopNavBar";
import 'bootstrap/dist/css/bootstrap.css';
// import {CardTextProps} from "mdb-react-ui-kit/dist/types/free/components/Card/CardText/types";

function App() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await FetchGetService(GET_ORDERS);
                setOrders(result);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

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
                console.error("Error fetching products:", error);
            }
        };


        fetchOrders();
        fetchProducts();
        fetchCategories()
    }, []);

    return (
        <div className="App">
            <TopNavBar />
            <header className="App-header w-100">
                {products.length > 0 ? (
                    <ProductTable products={products} categories={categories} />
                ) : (
                    <p>Loading...</p>
                )}
            </header>
            {/*<Cart />*/}
        </div>
    );
}

export default App;
