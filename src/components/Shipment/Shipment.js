import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => {
        //TOO : Move this after Payment
        const savedCart = getDatabaseCart();
        const orderDetails = {email: auth.user.email, cart:savedCart};
        fetch('http://localhost:3100/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then (data =>{
            alert('Your Order Placed Successfully with order id: '+ data._id);
            processOrder();
            });
    }

    return (
        <form className="shipmentform" onSubmit={handleSubmit(onSubmit)}>

            <input
                name="name"
                defaultValue={auth.user.name}
                ref={register({ required: true })}
                placeholder="Your Name"
            />
            {
                errors.name &&
                <span className="error">
                    Name is required
                </span>
            }

            <input
                name="email"
                defaultValue={auth.user.email}
                ref={register({ required: true })}
                placeholder="Your Email"
            />
            {
                errors.email &&
                <span className="error">
                    Email is required
                </span>
            }

            <input
                name="AddressLine1"
                ref={register({ required: true })}
                placeholder="Address Line 1"
            />
            {
                errors.AddressLine1 &&
                <span className="error">
                    Address is required
                </span>
            }

            <input name="AddressLine2"
                ref={register}
                placeholder="Address Line 2"
            />

            <input
                name="city"
                ref={register({ required: true })}
                placeholder="City"
            />
            {
                errors.city &&
                <span className="error">
                    City is required
                </span>
            }

            <input
                name="country"
                ref={register({ required: true })}
                placeholder="Country"
            />
            {
                errors.country &&
                <span className="error">
                    Country is required
                </span>}

            <input
                name="zipcode"
                ref={register({ required: true })}
                placeholder="Zipcode"
            />
            {
                errors.zipcode &&
                <span className="error">
                    Zipcode is required
                </span>
            }
            <input type="submit" />

        </form>
    )
};


export default Shipment;