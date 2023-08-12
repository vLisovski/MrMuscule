import React from 'react';
import {Button, Checkbox, Col, Form, Input} from "antd";
import {NavLink} from "react-router-dom";

const onFinish=(values)=>{
    console.log('success',values)
};

const onFinishFailed=(errorInfo)=>{
    console.log('Failed',errorInfo);
}

const AuthPage = () => {
    return (
        <>
            <Col span={8} offset={9} style={{
                display: "flex",
                flexDirection:"row",
                alignContent:"center",
                alignItems:"center",
                marginTop: "15%"}}>
                <Form name="authorization"
                      labelCol={{
                          span:8,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                      style={{
                          maxWidth:600
                      }}
                      initialValues={{
                          remember: true
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
                        name="Запомнить меня"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <Button type="primary" htmlType="submit">Войти</Button>
                        <small>
                            <NavLink to="/registration"> Зарегистрироваться</NavLink>
                        </small>
                    </Form.Item>
                </Form>
            </Col>
        </>

    );
};

export default AuthPage;