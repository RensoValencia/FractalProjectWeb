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
import { OrderEcommerce } from "./OrderEcommerce";

interface MyState {
    isOpen: boolean,
    orders: []
}

const fetchOrders = async () => {
    const result = await fetch('/order/list');
    return result.json();
}

function AllOrders() {
     const { data, isLoading } = useQuery('AllOrders', fetchOrders);
     return (
        <TableWithBrowserPagination keyField="name" isLoading={isLoading} data={data} 
        variant="listview" pageSize={3}>
            <Column header="status" field="status" />
            <Column header="date" field="date" />
            <Column header="customer" field="customer" />
            <Column header="taxes_amount" field="taxes_amount" />
            <Column header="total_amount" field="total_amount" />
        </TableWithBrowserPagination>
     );
}

const queryClient = new QueryClient();

export class DashboardOrder extends Component<{}, MyState> {

    state: MyState = {
        isOpen: false,
        orders: []
    };

    componentDidMount() {
        axios.get('/order/list').then(rest => {
            const orders = rest.data;
            this.setState({orders});

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
            <Navbar color="dark">
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

                <h1>List of Orders</h1>

                <OrderEcommerce isOpen={this.state.isOpen} togle={this.toogle}></OrderEcommerce>

                <button 
                    type="button" 
                    className="btn btn-danger button-right"
                    onClick={this.toogle}>Create new Order</button>
                 
                <p>&nbsp;</p>
                

                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Número</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Customer</th>
                        <th scope="col">taxes amount</th>
                        <th scope="col">total amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order, index) => renderOrder(order, index))} 
                        
                    </tbody>
                    </table>

                    <hr />

                    <h1>List of Orders with pagination</h1>

                    <QueryClientProvider client={queryClient}>
                        <AllOrders />
                    </QueryClientProvider>


                    </div>
                    
                </>
                
        )
    }
}

function renderOrder(st, index) {
    return (
        <>
        
        <tr>
            <th scope="row">{ index + 1}</th>
            <td>{ st.status}</td>
            <td>{ st.date}</td>
            <td>{ st.customer}</td>
            <th scope="col">{ st.taxes_amount}</th>
            <th scope="col">{ st.total_amount}</th>
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
    axios.post('http://localhost:7070/order/delete/' + id);
    window.location.reload();
}