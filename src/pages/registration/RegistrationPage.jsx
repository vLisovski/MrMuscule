import React, {useState} from 'react';
import {Button, Col, Form, Input} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import AuthOrRegister from "../../api/auth/AuthOrRegister";

const RegistrationPage = () => {

    let authOrRegister = new AuthOrRegister()
    let validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validRegexPassword = /^.{16}$/;
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState(" ")
    let [repeatPassword, setRepeatPassword] = useState(" ")
    let [validEmail, setValidEmail] = useState(false)
    let [validPassword, setValidPassword] = useState(false)
    let [validRepeat, setValidRepeat] = useState(true)
    let navigate = useNavigate()

    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
    }

    const onFinish = () => {
        let credentials = {
            email: email,
            password: password
        }
        authOrRegister.registration(credentials)
            .then(response => {
                console.log(response.data.token)
                navigate("/authorization")
            })
            .catch(error => {
                alert("Неверный логин или пароль!")
                console.log(error)
            }
        )
    };

    return (
        <>
            <Col span={8} offset={8} style={{
                border: `white`,
                borderRadius: "20px",
                borderStyle: "solid",
                boxShadow: `0px 0px 20px 20px rgba(0,0,200,0.2)`,
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: "15%"
            }}>

                <Form name="registration"
                      labelCol={{
                          span: 10,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                      style={{
                          maxWidth: 600,
                          marginTop: "10px",
                          marginLeft: "20%",
                          marginBottom: "10px"
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off">
                    <Form.Item
                        label="Почта:"
                        name="email"
                        style={{marginBottom: "2px"}}
                        rules={[{
                            required: true,
                            message: 'Введите email'
                        }]}>
                        <Input onChange={event => {
                            setEmail(event.target.value)
                            event.target.value.match(validRegexEmail)
                                ? setValidEmail(true)
                                : setValidEmail(false)
                        }}/>
                    </Form.Item>
                    {
                        validEmail ? <></> : <Col offset={10} style={{color: "red"}}>
                            <small>Неверный формат адреса почты</small>
                        </Col>
                    }
                    <Form.Item
                        label="Пароль:"
                        name="password"
                        style={{marginBottom: "2px"}}
                        rules={[{
                            required: true,
                            message: "Введите пароль"
                        }]}>
                        <Input.Password onChange={event => {
                            setPassword(event.target.value)
                            repeatPassword === event.target.value ? setValidRepeat(true) : setValidRepeat(false)
                            event.target.value.match(validRegexPassword)
                                ? setValidPassword(true)
                                : setValidPassword(false)
                        }}/>
                    </Form.Item>
                    {
                        validPassword ? <></> : <Col offset={10} span={16} style={{color: "red"}}>
                            <small>Пароль не должен быть короче 16-ти символов</small>
                        </Col>
                    }
                    <Form.Item
                        label="Повторите пароль:"
                        name="repeatPassword"
                        style={{marginBottom: "2px"}}
                        rules={[{
                            required: true,
                            message: "Повторите пароль"
                        }]}>
                        <Input.Password onChange={(event) => {
                            setRepeatPassword(event.target.value)
                            password === event.target.value ? setValidRepeat(true) : setValidRepeat(false)
                        }}/>
                    </Form.Item>
                    {
                        validRepeat ? <></> :
                            <Col offset={10} style={{color: "red"}}><small>Пароли не совпадают</small></Col>
                    }
                    {validEmail && validPassword
                        ?
                        <Form.Item wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                            style={{marginBottom: "2px"}}>
                            <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                        </Form.Item>
                        :
                        <small/>
                    }
                    <Col span={16} offset={8}>
                        <NavLink to="/authorization">Вернуться к авторизации</NavLink>
                    </Col>
                </Form>
            </Col>
        </>

    );
};

export default RegistrationPage;