import { Component } from "react";
import { Col, Container, Navbar, NavbarBrand, Row } from "reactstrap";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Table, Column, TableWithBrowserPagination } from 'react-rainbow-components';

import { 
    IoSchoolOutline,  
    IoMan,
    IoSettings,
    IoWoman,
    IoWomanOutline,
    IoCreateOutline
} from 'react-icons/io5';
import axios from "axios";
import { render } from "@testing-library/react";
import { CreateProduct } from "./CreateProduct";

interface MyState {
    isOpen: boolean,
    products: []
}

const fetchProducts = async () => {
    const result = await fetch('/products/list');
    return result.json();
}

function AllProducts() {
     const { data, isLoading } = useQuery('AllProducts', fetchProducts);
     return (
        <TableWithBrowserPagination keyField="name" isLoading={isLoading} data={data} 
        variant="listview" pageSize={3}>
            <Column header="name" field="name" />
            <Column header="category" field="category" />
            <Column header="unitPrice" field="unitPrice" />
            <Column header="quantity" field="quantity" />
            <Column header="cost" field="cost" />
        </TableWithBrowserPagination>
     );
}

const queryClient = new QueryClient();

export class Dashboard extends Component<{}, MyState> {

    state: MyState = {
        isOpen: false,
        products: []
    };

    componentDidMount() {
        axios.get('/products/list').then(rest => {
            const products = rest.data;
            this.setState({products});

        });
    }

    toogle = () => {
        this.setState((prevState) => ({
            isOpen : !prevState.isOpen
        }));
    }

    render() {
        return (
            <>
            <Navbar color="dark" light mb-2>
                <NavbarBrand className="text-white">
                    <IoSchoolOutline />
                    &nbsp;
                    <span>Fractal Solutions - Blaize</span>
                    
                </NavbarBrand>
            </Navbar>

            
            <p>&nbsp;</p>

            <div className="container">
                
                <button type="button" className="btn btn-primary">Products</button>
                &nbsp;&nbsp;&nbsp;
                <button type="button" className="btn btn-secondary">Orders</button>

                <hr />

                <h1>List of Products</h1>

                <CreateProduct isOpen={this.state.isOpen} togle={this.toogle}></CreateProduct>


                <button 
                    type="button" 
                    className="btn btn-danger button-right"
                    onClick={this.toogle}>Create new product</button>
                 
                <p>&nbsp;</p>
                

                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Número</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">UnitPrice</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, index) => renderProduct(product, index))} 
                        
                    </tbody>
                    </table>

                    <hr />

                    <h1>List of Products with pagination</h1>

                    <QueryClientProvider client={queryClient}>
                        <AllProducts />
                    </QueryClientProvider>


                    </div>
                    
                </>
                
        )
    }
}

function renderProduct(st, index) {
    return (
        <>
        
        <tr>
            <th scope="row">{ index + 1}</th>
            <td>{ st.name}</td>
            <td>{ st.category}</td>
            <td>{ st.unitPrice}</td>
            <th scope="col">{ st.quantity}</th>
            <th scope="col">
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => deleteId(st.id)}
            >Delete</button>
            </th>
        </tr>
        </>
        )
}

function deleteId(id: any): void {
    console.warn("se elimino: " + id);
    axios.post('http://localhost:7070/products/delete/' + id);
    window.location.reload();
}