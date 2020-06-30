import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_JmzzAcnc2o0LgUAG8vAftyQL00EEApPk3s'
  
  const onToken = token => {
    axios({ 
      url: 'payment', // will take current directory and append payment to it (on own backend)
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(respons => {
      alert("Payment Successful")
    }).catch(error => {
      console.log('Payment Error: ',JSON.parse(error));
      alert(
        'There was an issue with your payment. Please make sure you use the provided credit card.'
      )
    })
  }

  return (<StripeCheckout
    label='Pay Now'
    name='CRWN Clothing Ltd.'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
  />) 
}

export default StripeCheckoutButton;