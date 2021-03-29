import React from 'react';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IQDijHxFZiZPKLwJ5ntaanXO3k7mWX4PpWg2X6T5yggA8zTBIirXBuf8yZsxKBuUubjxEjhGnlEE6L3ZrOxUTvj00eQgkDNlR');


const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm  />
        </Elements>
    )
}

export default Checkout;