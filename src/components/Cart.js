//Imports
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import PersonalDataForm from "./PersonalData";
import "../css/Cart.css";

function switchProductIcon(category) {
    //Check the category of product and return correct image
    switch (category) {
        case 1:
            return (
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96mVnzQNDmWu65fo4LXL5jUx3qsWHTBFipz2evbD9Ww&s"
                    alt="NotLoaded"
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                />
            );
        case 2:
            return (
                <img
                    src="https://cdn-icons-png.flaticon.com/512/7910/7910612.png"
                    alt="NotLoaded"
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                />
            );
        case 3:
            return (
                <img
                    src="https://cdn-icons-png.flaticon.com/512/498/498266.png"
                    alt="NotLoaded"
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                />
            );
        case 4:
            return (
                <img
                    src="https://icons.veryicon.com/png/o/food--drinks/fresh-1/meat-4.png"
                    alt="NotLoaded"
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                />
            );
        case 5:
            return (
                <img
                    src="https://static.vecteezy.com/system/resources/previews/024/244/720/original/dairy-icon-in-illustration-vector.jpg"
                    alt="NotLoaded"
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                />
            );
        default:
            return null;
    }
}

export default function Cart() {
    const [selectedProducts, setSelectedProducts] = useState(JSON.parse(localStorage.getItem("myCart")) || []);

    const updateProductQuantity = (productId, newQuantity) => {
        const updatedProducts = selectedProducts.map((product) =>
            product._id === productId ? { ...product, quantity: newQuantity } : product
        );
        setSelectedProducts(updatedProducts);
        localStorage.setItem("myCart", JSON.stringify(updatedProducts));
    };

    const handleIncreaseClick = (productId) => {
        //Find current quantity of selected product and add 1
        //what about the upper limit of products for selling? is there any, like available in stock?
        const updatedQuantity = selectedProducts.find((product) => product._id === productId).quantity + 1;
        updateProductQuantity(productId, updatedQuantity);
    };

    const handleDecreaseClick = (productId) => {
        // Find current quantity of selected product
        const currentQuantity = selectedProducts.find((product) => product._id === productId).quantity;

        if (currentQuantity > 1) {
            // If quantity is greater than 1, decrease it
            const updatedQuantity = currentQuantity - 1;
            updateProductQuantity(productId, updatedQuantity);
        } else {
            // If quantity is 1, remove the product from the list
            //shouldn't it just block the "-" button??
            const updatedProducts = selectedProducts.filter((product) => product._id !== productId);
            setSelectedProducts(updatedProducts);
            localStorage.setItem("myCart", JSON.stringify(updatedProducts));
        }
    };

    const removeProduct = (productId) => {
        const updatedProducts = selectedProducts.filter((product) => product._id !== productId);
        setSelectedProducts(updatedProducts);
        localStorage.setItem("myCart", JSON.stringify(updatedProducts));
    };

    // Calculate total count and total cost --------- for each product, right??
    const totalCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
    const totalCost = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="cart">
            <div className="card">
                <label className="order-sumup-header">Your order</label>
                <MDBTable align="middle" className="table-striped order-table">
                    <MDBTableHead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {selectedProducts.map((property, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        {switchProductIcon(property.category)}
                                        <div className="ms-3">
                                            <p className="mb-1">{property.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="row">
                                        <div className="col-md-5 lower-quantity">
                                            <div className="modify-quantity">
                                                <MDBBtn
                                                    className="btn quantity-btn lower-quantity-btn"
                                                    rounded
                                                    outline
                                                    onClick={() => handleDecreaseClick(property._id)}
                                                    disabled={property.quantity === 1}
                                                    title="decrease amount"
                                                >
                                                    <label className="quantity-btn-label">-</label>
                                                </MDBBtn>
                                            </div>
                                        </div>
                                        <div className="col-md-2 quantity">
                                            <p className="fw-normal mb-1">{property.quantity}</p>
                                        </div>
                                        <div className="col-md-5 add-quantity">
                                            <div className="modify-quantity">
                                                <MDBBtn
                                                    className="btn quantity-btn add-quantity-btn"
                                                    rounded
                                                    outline
                                                    onClick={() => handleIncreaseClick(property._id)}
                                                    title="increase amount"
                                                >
                                                    <label className="quantity-btn-label">+</label>
                                                </MDBBtn>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="fw-normal mb-1">{property.price}</p>
                                </td>
                                <td>
                                    <p className="fw-normal mb-1">{property.price * property.quantity}</p>
                                </td>
                                <td>
                                    <div className="d-flex delete">
                                        <MDBBtn
                                            color="danger"
                                            rounded
                                            outline
                                            className="btn quantity-btn"
                                            onClick={() => removeProduct(property._id)}
                                            title="delete item from cart"
                                        >
                                            <label className="quantity-btn-label">x</label>
                                        </MDBBtn>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                    <tfoot className="table-footer">
                        <tr>
                            <td>Total Count</td>
                            <td>
                                <div className="row">
                                    <div className="col-md-5"></div>
                                    <div className="col-md-2 quantity">{totalCount}</div>
                                    <div className="col-md-5"></div>
                                </div>
                            </td>
                            <td>Total Cost</td>
                            <td>{totalCost}</td>
                        </tr>
                    </tfoot>
                </MDBTable>
            </div>
            <div className="card">
                <PersonalDataForm selectedProducts={selectedProducts} />
            </div>
        </div>
    );
}
