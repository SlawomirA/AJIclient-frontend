import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput, MDBModal, MDBModalBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import {POST_ODRERS} from "../utils/Urls";

const PersonalDataForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };



    const handleMakeOrderClick = () => {
        let nameCheck = formData.name.length !== 0;  // true/false if length =0

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
        // Test if the email matches the regex
        let emailCheck = formData.email.length !== 0 && emailRegex.test(formData.email);  // true/false if length = 0, match regex
        let phoneCheck = formData.phoneNumber.length !== 0 && phoneRegex.test(formData.phoneNumber);  // true/false if length = 0. match regex


        let checks = nameCheck && emailCheck && phoneCheck;
        // let ok;
        if(checks)
            postOrder()
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We\'ve encountered errors!\n' +
                    '',
                footer: 'Order validation error'
            })
        }
    };

    const postOrder = async () => {
        try {

            const selectedProducts = JSON.parse(localStorage.getItem('myCart')) || [];

            const productListString = Array.isArray(selectedProducts) ?
                selectedProducts.map(product => `${product._id} ${product.quantity}`).join(', ') : '';

            const response = await fetch(POST_ODRERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "date": "2023-09-28T12:00:00.000+00:00",
                    "orderStatus": "1",
                    "username": formData.name,
                    "email": formData.email,
                    "phoneNumber": formData.phoneNumber,
                    "productList": productListString.toString(),
                }),
            });

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Well done!',
                    text: 'Succesfully placed an order!',
                    footer: 'Confirmation'
                })

                return true;
            } else {
                console.error('Error posting order:', response.status, response.statusText);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'We encountered errors while placing an order.\n' +
                        '',
                    footer: 'Order post operation error'
                })
                return false;
            }
        } catch (error) {
            console.error('Error posting order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We encountered errors while placing an order.\n' +
                    '',
                footer: 'Order post operation error'
            })
            return false;
        }
    };


    return (
        <MDBContainer>
            <MDBRow className="justify-content-center mt-5">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <MDBInput
                            label="Your Name"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Your Email"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Your Phone Number"
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <div className="text-center mt-4">
                            <MDBBtn color="primary" type="submit"
                                    style={{ width: '100px', height: '60px' }}
                                    onClick={handleMakeOrderClick}>
                                Make an order
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default PersonalDataForm;