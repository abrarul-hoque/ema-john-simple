import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //const auth = useAuth();
    //console.log(auth.user);
    //const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = (total + product.price) * product.quantity;
    }
    let shipping = 0;
    if (total > 80) {
        shipping = 0;
    }
    else if (total > 25) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.11;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <h5>Items Ordered: {cart.length} </h5>
            <p>Total Price : ${formatNumber(total)}</p>
            <p><small>Shipping Cost : ${shipping}</small></p>
            <p><small>Tax + Vat : ${tax}</small></p>
            <h5>Total Price : ${grandTotal}</h5><br />
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;