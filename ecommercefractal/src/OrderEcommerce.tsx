import axios from "axios";
import { Component } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";

type MyProps ={
    isOpen: boolean,
    togle
    }

export class OrderEcommerce extends Component<MyProps> {

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        if(data.get('customer') == "" || data.get('customer') == null) {
            alert('Please, enter the name of the customer');
            return;
        }

        if(data.get('taxes_amount') == "" || data.get('taxes_amount') == null) {
            alert('Please, enter the taxes amount');
            return;
        }

        if(data.get('total_amount') == "" || data.get('total_amount') == null) {
            alert('Please, enter the total amount');
            return;
        }

        let config = {
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
              }
            }

        const orderFractal = {
            status: 'Pending',
            date: '05-11-2021',
            customer: data.get('customer'),
            taxes_amount: data.get('taxes_amount'),
            total_amount: data.get('total_amount')
        }

        axios.post('/order/create', orderFractal, config)
        .then((res) => {
            console.log(res)
           })
          .catch((err) => {
            console.log(err)
         });
        
        this.props.togle();
        window.location.reload();
    }

    render() {

        return (
            <>
        
            <Modal  animation="false" isOpen={this.props.isOpen} toggle={this.props.togle}> 
                <ModalHeader toggle={this.props.togle}>
                    Adding new Order
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit = {this.handleSubmit}>

                    <div className="form-group">
                        <label>Customer</label>
                        <input type="text" name="customer" id="customer" className="form-control" 
                        placeholder="Enter Customer" />
                    </div>

                    <div className="form-group">
                        <label>Taxes Amount</label>
                        <input type="text" name="taxes_amount" id="taxes_amount" className="form-control" 
                        placeholder="Enter the taxes amount" />
                    </div>

                    <div className="form-group">
                        <label>Total amount</label>
                        <input type="text" name="total_amount" id="total_amount" className="form-control" 
                        placeholder="Enter total amount" />
                    </div>


                    <div className="form-group">
                        <p>&nbsp;</p>
                        <button className="btn btn-success">Create Order</button>
                    </div>   
                
                    </Form>
                </ModalBody>
            </Modal>
            </>
        );
    }

}