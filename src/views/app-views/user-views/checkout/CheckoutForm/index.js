import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, Button } from 'antd';
import {checkOut } from 'redux/actions/payment';
import PaymentService from 'services/PaymentService';
import fetch from 'auth/FetchInterceptor'
import Flex from 'components/shared-components/Flex'


class CheckoutForm extends React.Component {

    componentWillMount(){
        if(!this.props.plan){
            this.props.history.push('/app/user/plans')
        }

        console.log(this.props)
    }

  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const {stripe, elements, plan} = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      console.log('stripe not loaded')
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const data = {paymentMethod, planId: this.props.plan.id};
      PaymentService.checkout(data).then(response => {
        checkOut(paymentMethod);
        console.log(this.props.plan.id)
      })

    //   fetch({
    //     url: '/checkout',
    //     method: 'post',
    //     data: {paymentMethod, planId: this.props.plan.id}
    //   }).then(response => {
    //     // checkOut(paymentMethod);
    //     console.log(response)
    //   })

    }
  };

  CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238"
        }
      }
    }
  }

  render() {
    if(this.props.plan){
        return (
            // <Flex alignItems="center" justifyContent="center">
                <Row gutter={2}>
                    <Col xs={24} sm={24} md={16}>
                        <Card title="Check Out">
                            <form onSubmit={this.handleSubmit}>
                                <div className="product-info">
                                    <h3 className="product-title">{this.props.plan.name}</h3>
                                    
                                    <h4 className="product-price">${this.props.plan.price}</h4>
                                </div>
                                <CardElement options={this.CARD_ELEMENT_OPTIONS} />
                                <Button type="blue" onClick={this.handleSubmit}>Pay</Button>
                            </form>
                        </Card>
                    </Col>
                </Row> 
        
            // </Flex>
        );
    }

    return <></>
  }
}

function InjectedCheckoutForm(props) {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
            <CheckoutForm stripe={stripe} elements={elements} {...props} />
            )}
        </ElementsConsumer>
    );
  }

  function mapStateToProps({ paymentReducer, planReducer }) {
    //   const {paymentMethod} = paymentReducer;
      const {plan} = planReducer;
      return { plan};
  }

  const mapDispatchToProps = {
      checkOut
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InjectedCheckoutForm));