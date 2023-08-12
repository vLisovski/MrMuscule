import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import AuthOrRegister from "../../api/auth/AuthOrRegister";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import UsersApiWorker from "../../api/user/UsersApiWorker";

const onFinishFailed = (errorInfo) => {
    console.log('Failed', errorInfo);
}

const AuthPage = () => {
    let [validEmail, setValidEmail] = useState(false);
    let validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let [email, setEmail] = useState("");
    let [validPassword, setValidPassword] = useState(false);
    let validRegexPassword = /^.{16}$/;
    let [password, setPassword] = useState("");
    let [rgba, setRgba] = useState("rgba(200, 0, 0, 0.2)")
    let localStorageWorker = new LocalStorageWorker();
    let authOrRegister = new AuthOrRegister();
    let usersApiWorker = new UsersApiWorker();
    let navigate = useNavigate();

    let onFinish = (values) => {
        let credentials = {
            email: values.email,
            password: values.password
        }
        authOrRegister.authentication(credentials).then(
            response => {
                let token = response.data.token;
                localStorageWorker.save("token", token);
                usersApiWorker.getIdByToken(token).then(
                    response => {
                        let userid = response.data;
                        localStorageWorker.save("userid", userid);
                        console.log(localStorageWorker.get(userid))
                        navigate("/account/info");
                    }
                ).catch(
                    error => {
                        alert(error);
                    }
                )
            }).catch(
            error => {
                alert(error)
            }
        )
    };

    useEffect(() => {
        if (validPassword && validEmail) {
            setRgba("rgba(0, 200, 0, 0.2)")
        } else {
            setRgba("rgba(200, 0, 0, 0.2)")
        }
    }, [validEmail, validPassword]);

    return (
        <>
            <Col span={8} offset={8} style={{
                border: `white`,
                borderRadius: "20px",
                borderStyle: "solid",
                boxShadow: `0px 0px 20px 20px ${rgba}`,
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: "15%"
            }}>
                <Form name="authorization"
                      labelCol={{
                          span: 8,
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
                      initialValues={{
                          remember: true
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off">
                    <Form.Item
                        label="Почта"
                        name="email"
                        style={{marginBottom: "0px"}}
                        rules={[{
                            required: true,
                            message: 'Введите email'
                        }]}>
                        <Input status={validEmail} onChange={event => {
                            setEmail(event.target.value)
                            event.target.value.match(validRegexEmail)
                                ? setValidEmail(true)
                                : setValidEmail(false)
                        }}/>
                    </Form.Item>
                    {validEmail
                        ?
                        <small/>
                        :
                        <Col span={16} offset={8}>
                            <small style={{color: "red"}}>Email имеет неверный формат</small>
                        </Col>}
                    <Form.Item
                        label="Пароль"
                        name="password"
                        style={{marginBottom: "0px"}}
                        rules={[{
                            required: true,
                            message: "Введите пароль"
                        }]}>
                        <Input.Password status={validPassword}
                            onChange={event => {
                            setPassword(event.target.value)
                            event.target.value.match(validRegexPassword)
                                ? setValidPassword(true)
                                : setValidPassword(false)
                        }}/>
                    </Form.Item>
                    {validPassword
                        ?
                        <small/>
                        :
                        <Col span={16} offset={8}>
                            <small style={{color: "red"}}>Пароль состоит из 16-ти символов</small>
                        </Col>}
                    <Form.Item
                        name="Remember me"
                        valuePropName="checked"
                        style={{marginBottom: "2px"}}
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    {validEmail && validPassword
                        ?
                        <Form.Item style={{marginBottom: "2px"}}
                                   wrapperCol={{
                                       offset: 8,
                                       span: 16
                                   }}>
                            <Button type="primary" htmlType="submit">Войти</Button>
                        </Form.Item>
                        : <small/>}
                    <Col span={6} offset={8}>
                        <NavLink to="/registration"> Зарегистрироваться</NavLink>
                    </Col>
                </Form>
            </Col>
        </>

    );
};

export default AuthPage;