import React from 'react';
import Footer from "../../components/footer/Footer";
import {Button, Checkbox, Col, Form, Input, Space} from "antd";
import {NavLink} from "react-router-dom";

const onFinish=(values)=>{
    console.log('success',values)
};

const onFinishFailed=(errorInfo)=>{
    console.log('Failed',errorInfo);
}

const RegistrationPage = () => {
    return (
        <>
            <Col span={8} offset={9} style={{
                display: "flex",
                flexDirection:"row",
                alignContent:"center",
                alignItems:"center",
                marginTop: "15%"}}>

                <Form name="registration"
                 labelCol={{
                     span:8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                 style={{
                     maxWidth:600
                 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Введите email'
                        }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: "Введите пароль"
                    }]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}>
                        <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                        <small>
                            <NavLink to="/authorization">Войти</NavLink>
                        </small>
                    </Form.Item>
                </Form>
            </Col>
        </>

    );
};

export default RegistrationPage;