import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_bRJQhDYn9JzX4McWavf3qKrl00wT2fZ3Bj';

    const onToken = token => {
        console.log(token);
        alert('Payment successful')
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="e-commerce-react2"
            billingAddress
            shippingAddress
            
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};
export default StripeCheckoutButton;