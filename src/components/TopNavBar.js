import React, {useState} from 'react';
import '../css/TopNavBar.css';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse, MDBIcon
} from 'mdb-react-ui-kit';

export default function TopNavBar() {
    const [showNav, setShowNav] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>Shop</MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNav(!showNav)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNav}>
                    <MDBNavbarNav>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='#'>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>Products</MDBNavbarLink>
                        </MDBNavbarItem>
                        {/*<MDBNavbarItem>*/}
                        {/*    <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>*/}
                        {/*        Disabled*/}
                        {/*    </MDBNavbarLink>*/}
                        {/*</MDBNavbarItem>*/}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
