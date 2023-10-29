
//Imports
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {MDBBtn, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import PersonalDataForm from "./PersonalData";


function switchProductIcon(category) {
    //Check the category of product and return correct image
    switch (category) {
        case 1:
            return <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96mVnzQNDmWu65fo4LXL5jUx3qsWHTBFipz2evbD9Ww&s' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 2:
            return <img src='https://cdn-icons-png.flaticon.com/512/7910/7910612.png' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 3:
            return <img src='https://cdn-icons-png.flaticon.com/512/498/498266.png' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 4:
            return <img src='https://icons.veryicon.com/png/o/food--drinks/fresh-1/meat-4.png' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 5:
            return <img src='https://static.vecteezy.com/system/resources/previews/024/244/720/original/dairy-icon-in-illustration-vector.jpg' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        default:
            return null;
    }
}

export default function Cart() {
    const [selectedProducts, setSelectedProducts] = useState(
        JSON.parse(localStorage.getItem('myCart')) || []
    );

    const updateProductQuantity = (productId, newQuantity) => {
        const updatedProducts = selectedProducts.map((product) =>
            product._id === productId ? { ...product, quantity: newQuantity } : product
        );
        setSelectedProducts(updatedProducts);
        localStorage.setItem('myCart', JSON.stringify(updatedProducts));
    };

    const handleIncreaseClick = (productId) => {
        //Find current quantity of selected product and add 1
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
            const updatedProducts = selectedProducts.filter((product) => product._id !== productId);
            setSelectedProducts(updatedProducts);
            localStorage.setItem('myCart', JSON.stringify(updatedProducts));
        }
    };

    const removeProduct = (productId) => {
        const updatedProducts = selectedProducts.filter((product) => product._id !== productId);
        setSelectedProducts(updatedProducts);
        localStorage.setItem('myCart', JSON.stringify(updatedProducts));
    }

    // Calculate total count and total cost
    const totalCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
    const totalCost = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);


    return (

        <div>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Action</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Cost</th>
                        <th scope='col'>Total Price</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {selectedProducts.map((property, index) => (
                        <tr key={index}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    {switchProductIcon(property.category)}
                                    <div className='ms-3'>
                                        <p className='mb-1'>{property.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='d-flex'>
                                    <MDBBtn
                                        color='success'
                                        className='btn btn-default btn-work'
                                        style={{ width: '50px', height: '30px' }}
                                        onClick={() => handleIncreaseClick(property._id)}
                                    >
                                        +
                                    </MDBBtn>
                                    <MDBBtn
                                        color='warning'
                                        className='text-center'
                                        style={{ width: '50px', height: '30px' }}
                                        onClick={() => handleDecreaseClick(property._id)}
                                    >
                                        -
                                    </MDBBtn>
                                    <MDBBtn
                                        color='danger'
                                        className='text-center'
                                        style={{ width: '50px', height: '30px' }}
                                        onClick={() => removeProduct(property._id)}
                                    >
                                        X
                                    </MDBBtn>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{property.quantity}</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{property.price}</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{property.price * property.quantity}</p>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
                <tfoot>
                <tr>
                    <td>Total Count</td>
                    <td>{totalCount}</td>
                    <td>Total Cost</td>
                    <td>{totalCost}</td>
                </tr>
                </tfoot>
            </MDBTable>
            <PersonalDataForm />
        </div>
    );
}
