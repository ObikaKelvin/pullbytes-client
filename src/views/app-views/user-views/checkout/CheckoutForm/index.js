import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, notification, Select, Button } from 'antd';
import {checkOut } from 'redux/actions/payment';
import PaymentService from 'services/PaymentService';
import fetch from 'auth/FetchInterceptor'
import Flex from 'components/shared-components/Flex'


class CheckoutForm extends React.Component {

    state = {
      submitLoading: false
    }

    componentWillMount(){
        if(!this.props.plan){
            this.props.history.push('/app/user/plans')
        }

        console.log(this.props)
    }

  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    this.setState({
      submitLoading: false
    })

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
      this.setState({
        submitLoading: true
      })
      const data = {payment_id: paymentMethod.id, planId: this.props.plan.id};
      PaymentService.checkout(data).then(response => {
        console.log(paymentMethod)
        checkOut(paymentMethod);
        // message.success(`successfully purchased `)
        message.success(`successfully purchased ${response.plan.name}`)
        setTimeout(() => {
          this.props.history.push(`/app/user/licenses/edit/${response.license.id}`)
        }, 2000);

        console.log(this.props.plan.id)
      }).catch(error => {
        this.setState({
          submitLoading: false
        })
        if(error.response){
          notification.error({message: error.response.data.message})
          console.log(error.response.data.message)
        }
      })

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
        },
        
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
            // <Flex flexDirection="column" className="w-100" alignItems="center" justifyContent="center">
            //     <Row gutter={2}>
            //         <Col xs={24} sm={24} md={16}>
            //             <Card title="Check Out">
            //                 <form onSubmit={this.handleSubmit}>
            //                     <div className="product-info">
            //                         <h3 className="product-title">{this.props.plan.name}</h3>
                                    
            //                         <h4 className="product-price">${this.props.plan.price}</h4>
            //                     </div>
            //                     <CardElement options={this.CARD_ELEMENT_OPTIONS} />
            //                     <Button type="blue" onClick={this.handleSubmit}>Pay</Button>
            //                 </form>
            //             </Card>
            //         </Col>
            //     </Row> 
        
            // </Flex>


            <Row gutter={16}>
              <Col xs={24} sm={24} md={17}>
                <Card title="Check Out">
                  <div className="p-3 mb-4">
                    <div className="text-center">
                      <h1 className="display-4 mt-4"> 
                        <span className="font-size-md d-inline-block mr-1" style={{transform: 'translate(0px, -17px)'}}>$</span>
                        <span>{this.props.plan.price}</span>
                      </h1>
                      <p className="mb-0">{this.props.plan.interval}</p>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-center font-weight-semibold">{this.props.plan.name}</h2>
                    </div>
                  </div>
                  <CardElement options={this.CARD_ELEMENT_OPTIONS} />
                  <Flex className="w-100 mt-4 mb-4" alignItems="center" justifyContent="center">
                    <Button type="primary" onClick={this.handleSubmit} htmlType="submit" loading={this.state.submitLoading} >
                      Pay Now (${this.props.plan.price})
                    </Button>
                  </Flex>
                  
                </Card>
              </Col>
              
            </Row>
        

            
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