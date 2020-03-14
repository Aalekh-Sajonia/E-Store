import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_9dWliLPnsO5cCeX8m6Pp2VxT00HLKNu7wW';
    const ontoken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then((response) => {
            alert("Payment Success")
        }).catch((err) => {
            console.log('payment error: ', JSON.parse(err));
            alert('There was an issue with the payment');
        })
    };
    return (
        <StripeCheckout
            label = 'Pay NOW'
            name = 'E-Shop'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay NOW'
            token = {ontoken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;