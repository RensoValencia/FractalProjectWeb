
import axios from "axios";
import { Component } from "react";

import { 
    IoSchoolOutline,  
    IoMan,
    IoSettings,
    IoWoman,
    IoWomanOutline
} from 'react-icons/io5';
import { Col, Form, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

type MyProps ={
isOpen: boolean,
togle
}


export class CreateProduct extends Component<MyProps> {

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        console.warn("data: " + data.get('name'));

        if(data.get('name') == "" || data.get('name') == null) {
            alert('Please, enter the name of the product');
            return;
        }

        if(data.get('category') == "" || data.get('category') == null) {
            alert('Please, enter the category of the product');
            return;
        }

        if(data.get('unitPrice') == "" || data.get('unitPrice') == null) {
            alert('Please, enter the unit price of the product');
            return;
        }

        if(data.get('quantity') == "" || data.get('quantity') == null) {
            alert('Please, enter the quantity of the product');
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

        const product = {
            name: data.get('name'),
            category: data.get('category'),
            unitPrice: data.get('unitPrice'),
            quantity: data.get('quantity'),
            cost: '1'
        }

        axios.post('/products/create', product, config)
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
                    Adding new Product
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit = {this.handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" id="name" className="form-control" placeholder="Enter Name" />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" name="category" id="category" className="form-control" placeholder="Enter Category" />
                    </div>

                    <div className="form-group">
                        <label>Unit Price</label>
                        <input type="text" name="unitPrice" id="unitPrice" className="form-control" placeholder="Enter Unit Price" />
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="text" name="quantity" id="quantity" className="form-control" placeholder="Enter Quantity" />
                    </div>

                    <div className="form-group">
                        <p>&nbsp;</p>
                        <button className="btn btn-success">Create Product</button>
                    </div>   
                
                    </Form>
                </ModalBody>
            </Modal>
            </>
        );
    }
}