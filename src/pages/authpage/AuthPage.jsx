import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import AuthOrRegister from "../../api/auth/AuthOrRegister";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import UsersApiWorker from "../../api/user/UsersApiWorker";
import CartApi from "../../api/cart/CartApi";

const onFinishFailed = (errorInfo) => {
    console.log('Failed', errorInfo);
}

const AuthPage = (props) => {
    let [remember, setRemember] = useState("false")
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
    let cartApi = new CartApi()
    let navigate = useNavigate();

    let onFinish = (values) => {
        let credentials = {
            email: email,
            password: password
        }
        authOrRegister.authentication(credentials).then(
            response => {
                if(remember==="true"){
                    localStorageWorker.save("remember", remember)
                    localStorageWorker.save("email", email)
                    localStorageWorker.save("password", password)
                }else{
                    localStorageWorker.save("remember", remember)
                    localStorageWorker.save("email", "")
                    localStorageWorker.save("password", "")
                }
                let token = response.data.token;
                localStorageWorker.save("token", token);
                usersApiWorker.getIdByToken(token)
                    .then(response => {
                        let userid = response.data;
                        localStorageWorker.save("userid", userid);
                        if(localStorageWorker.get("cart").length>0){

                            cartApi.clearCart(userid, token)
                                .catch(error => console.log(error))

                            cartApi.addCart({
                                userId: userid,
                                carts: localStorageWorker.get("cart").split(",")
                            }, localStorageWorker.get("token"))
                                .catch(error => console.log(error))
                        }
                        navigate(localStorageWorker.get("location").substr(21));
                    }
                ).catch(
                    error => {
                        console.log(error)
                    }
                )
            }).catch(
            error => {
                alert("Неверный логин или пароль!")
                console.log(error)
            }
        )
    };

    useEffect(() => {
        props.setCurrent("account")
        if (validPassword && validEmail) {
            setRgba("rgba(0,0,200,0.2)")
        } else {
            setRgba("rgba(200, 0, 0, 0.2)")
        }
        setPassword(localStorageWorker.get("password"))
        setEmail(localStorageWorker.get("email"))
    }, []);

    useEffect(()=>{
        password.match(validRegexPassword)
            ? setValidPassword(true)
            : setValidPassword(false)
    },[password])

    useEffect(()=>{
        email.match(validRegexEmail)
            ? setValidEmail(true)
            : setValidEmail(false)
    },[email])

    useEffect(() => {
        if (validPassword && validEmail) {
            setRgba("rgba(0,0,200,0.2)")
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
                          email: localStorageWorker.get("email"),
                          password: localStorageWorker.get("password")
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete={remember}>
                    <Form.Item
                        label="Почта"
                        valuePropName="mail"
                        name="email"
                        style={{marginBottom: "2px"}}
                        rules={[{
                            required: true,
                            message: 'Введите email'
                        }]}>
                        <Input status={validEmail} value={email} onChange={event => {
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
                        valuePropName="paswrd"
                        name="password"
                        style={{marginBottom: "2px"}}
                        rules={[{
                            required: true,
                            message: "Введите пароль"
                        }]}>
                        <Input.Password maxLength={16}
                                        value={password}
                                        status={validPassword}
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
                        <Checkbox onClick={()=>{
                            remember==="true" ? setRemember("false") : setRemember("true")
                            console.log(remember)
                        }}>Запомнить меня</Checkbox>
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
                        <NavLink to="/registration">Зарегистрироваться</NavLink>
                    </Col>
                </Form>
            </Col>
        </>
    );
};

export default AuthPage;