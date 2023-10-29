import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput, MDBModal, MDBModalBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";

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
        {
            Swal.fire({
                icon: 'success',
                title: 'Well done!',
                text: 'Succesfully placed an order!',
                footer: 'Confirmation'
            })

        }
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