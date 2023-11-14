import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBValidation,
    MDBValidationItem,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { POST_ODRERS } from "../utils/Urls";
import "../css/PersonalData.css";

const PersonalDataForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const [feedbackName, setFeedbackName] = useState("");
    const [feedbackEmail, setFeedbackEmail] = useState("");
    const [feedbackPhone, setFeedbackPhone] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        let element = document.getElementById(name);
        if (name === "name") {
            if (value.length == 0) {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
                setFeedbackName("Name cannot be empty");
            } else if (value.length < 6) {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
                setFeedbackName("Name must contain at least 6 characters");
            } else {
                if (element.classList.contains("is-invalid")) {
                    element.classList.remove("is-invalid");
                }
                setFeedbackName("");
            }
        } else if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (value.length == 0) {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
                setFeedbackEmail("E-mail required");
            } else if (emailRegex.test(value)) {
                if (element.classList.contains("is-invalid")) {
                    element.classList.remove("is-invalid");
                }
                setFeedbackEmail("");
            } else {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
                setFeedbackEmail("E-mail not valid");
            }
        } else if (name === "phoneNumber") {
            const phoneRegex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
            if (value.length == 0) {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
                setFeedbackPhone("Phone number required");
            } else if (phoneRegex.test(value)) {
                if (element.classList.contains("is-invalid")) {
                    element.classList.remove("is-invalid");
                }
                setFeedbackPhone("");
            } else {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
                setFeedbackPhone("Phone number not valid");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("Form submitted:", formData);
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
                    <MDBValidation onSubmit={handleSubmit} className="cart" noValidate>
                        <div className="row form-row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="name">
                                    Your full name:
                                </label>
                            </div>
                            <MDBValidationItem className="col-md-9" feedback={feedbackName} invalid>
                                <MDBInput
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onInput={handleInput}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="email">
                                    Your e-mail:
                                </label>
                            </div>
                            <MDBValidationItem className="col-md-9" feedback={feedbackEmail} invalid>
                                <MDBInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onInput={handleInput}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className="row form-row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="phoneNumber">
                                    Your phone number:
                                </label>
                            </div>
                            <MDBValidationItem className="col-md-9" feedback={feedbackPhone} invalid>
                                <MDBInput
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    onInput={handleInput}
                                    required
                                />
                            </MDBValidationItem>
                        </div>

                        <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2">
                                <MDBBtn type="submit" className="btn order-btn" onClick={handleMakeOrderClick}>
                                    <label className="order-btn-label">Order</label>
                                </MDBBtn>
                            </div>
                        </div>
                    </MDBValidation>
                </div>
            </div>
        </MDBContainer>
    );
};

export default PersonalDataForm;
