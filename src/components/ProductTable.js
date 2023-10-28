import React, {useEffect, useState} from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../css/ProductTable.css';

function switchProductIcon(category) {
    //Check the category of product and return correct image
    switch (category) {
        case 1:
            return <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96mVnzQNDmWu65fo4LXL5jUx3qsWHTBFipz2evbD9Ww&s' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 2:
            return <img src='../../data/vegetables.png' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 3:
            return <img src='../../data/cereals.png' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 4:
            return <img src='../../data/meat.png' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        case 5:
            return <img src='../../data/dairy.jpg' alt='NotLoaded' style={{ width: '45px', height: '45px' }} className='rounded-circle' />;
        default:
            return null;
    }
}

export default function ProductTable({ products, categories}) {

    //Assign selected category from the dropdown menu function
    const [selectedCategory, setSelectedCategory] = useState(null);

    //Assign name input from the input label
    const [searchTerm, setSearchTerm] = useState('');

    //Function for setting current category for selectedCategory variable
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    //Function for setting current search pattern input for searchTerm variable
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    //Filtering products
    const filteredProducts = products.filter((product) => {
        //If selectedCategory is not null then assign value from the dropdown menu, else assign as true for every
        //of the categories
        const categoryMatch = selectedCategory ? product.category === parseInt(selectedCategory, 10) : true;
        const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && nameMatch;
    });


    return (
        <div>
            <label htmlFor="categoryFilter">Filter by Category: </label>
            {/*Assign as selectedCategory or empty string in case selectedCategory is falsy - initial state of null*/}
            <select id="categoryFilter" onChange={handleCategoryChange} value={selectedCategory || ''}>
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor="nameFilter">Filter by Name: </label>
            <input type="text" id="nameFilter" value={searchTerm} onChange={handleSearchChange} />


            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Cost</th>
                        <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {filteredProducts.map((property, index) => (
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
                                <p className='fw-normal mb-1'>{property.description}</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{property.price}</p>
                            </td>
                            <td>
                                <div className='d-flex'>
                                    <MDBBtn style={{ width: '50px', height: '30px' }}>
                                        Buy
                                    </MDBBtn>
                                </div>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
}
