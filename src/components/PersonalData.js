import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput, MDBModal, MDBModalBody } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { POST_ODRERS } from "../utils/Urls";
import "../css/PersonalData.css";

const PersonalDataForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
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
        //ok but what's the point of this???
        console.log("Form submitted:", formData);
    };

    const handleMakeOrderClick = () => {
        let nameCheck = formData.name.length !== 0; // true/false if length = 0

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
        // Test if the email matches the regex
        let emailCheck = formData.email.length !== 0 && emailRegex.test(formData.email); // true/false if length = 0, match regex
        let phoneCheck = formData.phoneNumber.length !== 0 && phoneRegex.test(formData.phoneNumber); // true/false if length = 0. match regex

        let checks = nameCheck && emailCheck && phoneCheck;
        // let ok;
        if (checks) postOrder();
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                html:
                    //these are a bit blunt, these errors should be on input under the input box
                    "We've encountered errors!<br/>" +
                    (nameCheck ? "" : "Name validation error...<br/>") +
                    (emailCheck ? "" : "Email validation error...<br/>") +
                    (phoneCheck ? "" : "Phone validation error...<br/>"),
                footer: "Order validation error",
            });
        }
    };

    const postOrder = async () => {
        try {
            const selectedProducts = JSON.parse(localStorage.getItem("myCart")) || [];

            const productListString = Array.isArray(selectedProducts)
                ? selectedProducts.map((product) => `${product._id} ${product.quantity}`).join(", ")
                : "";

            const response = await fetch(POST_ODRERS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: "2023-09-28T12:00:00.000+00:00",
                    orderStatus: "1",
                    username: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    productList: productListString.toString(),
                }),
            });

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    //could just use toastr, simpler alert
                    icon: "success",
                    title: "Well done!",
                    text: "Succesfully placed an order!",
                    footer: "Confirmation",
                });

                return true;
            } else {
                //could just use toastr, simpler alert
                console.error("Error posting order:", response.status, response.statusText);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "We encountered errors while placing an order.\n",
                    footer: "Order post operation error",
                });
                return false;
            }
        } catch (error) {
            console.error("Error posting order:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "We encountered errors while placing an order.\n",
                footer: "Order post operation error",
            });
            return false;
        }
    };

    return (
        <MDBContainer>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit} className="cart">
                        <div className="row form-row">
                            <div className="col-md-3">
                                <label className="form-label" for="name">
                                    Your name:
                                </label>
                            </div>
                            <div className="col-md-9">
                                <MDBInput
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-3">
                                <label className="form-label" for="email">
                                    Your e-mail:
                                </label>
                            </div>
                            <div className="col-md-9">
                                <MDBInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-3">
                                <label className="form-label" for="phoneNumber">
                                    Your phone number:
                                </label>
                            </div>
                            <div className="col-md-9">
                                <MDBInput
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2">
                                <MDBBtn type="submit" className="btn order-btn" onClick={handleMakeOrderClick}>
                                    <label className="order-btn-label">Order</label>
                                </MDBBtn>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MDBContainer>
    );
};

export default PersonalDataForm;
