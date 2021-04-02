import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROW_GUTTER } from 'constants/ThemeConstant';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import { Row, Col, notification, message, Button, Badge, Tooltip, Switch, Skeleton, Form, Input, Modal } from 'antd';
import { CreditCardOutlined, CalendarOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import PaymentService from 'services/PaymentService'


const PlanForm = props => {

	const { plan } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

    return(
        <Modal
			title="Checkout Form"
			visible={props.modalVisible}
			okText={plan ? `Pay now ($${plan.price})` : 'Pay now' }
			onCancel={props.closeModal}
            confirmLoading={true}
			onOk={() => {
                
                form
                .validateFields()
                .then(values => {
                    setSubmitLoading(false)
                
                    const {stripe, elements, plan} = props;
            
                    const cardHolderName = values.cardHolderName;
                    
                    const card = {
                        cardNumber: values.cardNumber,
                        exp: values.exp,
                        cvc: values.cvc
                    }

                    const element = stripe.elements();
                    setSubmitLoading(true)
                    let exp_month = values.exp.split('/')[0]
                    let exp_year = values.exp.split('/')[1]
                    let data = {
                        card: {
                            number: values.cardNumber,
                            exp_month,
                            exp_year,
                            cvc: values.cvc
                        },
                        cardHolderName,
                        planId: props.plan.id,
                        couponId: values.promo_code,
                    }
                        
                    PaymentService.checkout(data).then(response => {
                        message.success(`successfully purchased ${response.plan.name}`)
                        setTimeout(() => {
                        history.push(`/app/user/licenses/edit/${response.license.id}`)
                    }, 2000);
                    }).catch(error => {
                        setSubmitLoading(false)
                        if(error.response){
                        notification.error({message: error.response.data.message})
                        console.log(error)
                        }
                    })
                    
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });


            }}
        >
            <Form
                    form={form}
                    name="addCardForm"
                    layout="vertical"
                >
                    <Form.Item
                    label="Card holder name"
                    name="cardHolderName"
                    rules={
                        [
                        { 
                            require: true,
                            message: 'Please enter card holder name!' 
                        }
                        ]
                    }
                    >
                    <Input suffix={<CreditCardOutlined />} placeholder="Card holder name" />
                    </Form.Item>
                    <Form.Item
                    label="Card number"
                    name="cardNumber"
                    hasFeedback
                    rules={
                        [
                        { 
                            pattern: /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g,
                            message: 'Please enter a valid credit card number!' 
                        }
                        ]
                    }
                    >
                    <Input suffix={<CreditCardOutlined />} placeholder="0000 0000 0000 0000" />
                    </Form.Item>
                    <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                        label="Expiry date"
                        name="exp"
                        rules={
                            [
                            { 
                                pattern: /^(0[1-9]|1[0-2])[- /.]\d{2}/,
                                message: 'Please enter a valid date format!' 
                            }
                            ]
                        }
                        >
                        <Input suffix={<CalendarOutlined />} placeholder="MM/YY" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                        label="CVV code"
                        name="cvv"
                        rules={
                            [
                            { 
                                pattern: /^[0-9]{3,4}$/,
                                message: 'Please enter a CVV code format!' 
                            }
                            ]
                        }
                        >
                        <Input 
                            suffix={
                            <Tooltip title="The last three digits printed on the back of the card">
                                <QuestionCircleOutlined className="cursor-pointer" />
                            </Tooltip>
                            } 
                            placeholder="000"
                            />
                        </Form.Item>

                        
                    </Col>

                    <Col>
                    <Form.Item
                        label="Promo Code"
                        name="promo_code"
                        >
                        <Input 
                            // suffix={
                            // <Tooltip title="The last three digits printed on the back of the card">
                            //     <QuestionCircleOutlined className="cursor-pointer" />
                            // </Tooltip>
                            // } 
                            placeholder="Promo Code"
                            />
                        </Form.Item>
                    </Col>
                    </Row>
                </Form>			
        
            
        </Modal>
        
    );
}

function InjectedCheckoutForm(props) {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
            <PlanForm stripe={stripe} elements={elements} {...props} />
            )}
        </ElementsConsumer>
    );
}

const mapStateToProps = ({ planReducer }) => {
	const { plan } = planReducer;
	return { plan };
}

export default connect(mapStateToProps)(InjectedCheckoutForm);