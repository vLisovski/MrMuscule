import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Space} from "antd";

import Avatar from "../../shared/Avatar";
import InfoFields from "./InfoFields";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {NavLink, useNavigate} from "react-router-dom";

const PersonalInformationField = (props) => {

    let localStorageWorker = new LocalStorageWorker();
    let user = props.user
    let navigate = useNavigate();

    let [updateName, setUpdateName] = useState(false)
    let [updateEmail, setUpdateEmail] = useState(false)
    let [updatePhoneNumber, setUpdatePhoneNumber] = useState(false)
    let [updateAvatarPath, setUpdateAvatarPath] = useState(false)
    let [currentUpdateForm, setCurrentUpdateForm] = useState()

    const updateNameForm = (
        <Form name="registration"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              style={{
                  marginTop: "49%",
                  marginRight: "30px",
                  width: 300
              }}
              onFinish={()=>{

              }}
              onFinishFailed={()=>{

              }}
              autoComplete="off">
        <Form.Item
            label="Имя"
            name="name"
            rules={[{
                required: true,
                message: 'Введите новое имя:'
            }]}>
            <Input/>
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16
            }}>
            <Button type="primary" htmlType="submit">Сохранить</Button>
        </Form.Item>
    </Form>)

    const updateEmailForm = (
        <Form name="registration"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              style={{
                  marginTop: "49%",
                  marginRight: "30px",
                  width: 300
              }}
              onFinish={()=>{

              }}
              onFinishFailed={()=>{

              }}
              autoComplete="off">
            <Form.Item
                label="Почта"
                name="email"
                rules={[{
                    required: true,
                    message: 'Введите новою почту:'
                }]}>
                <Input/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item>
        </Form>)

    const updatePhoneNumberForm = (
        <Form name="registration"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              style={{
                  marginTop: "49%",
                  marginRight: "30px",
                  width: 300
              }}
              onFinish={()=>{

              }}
              onFinishFailed={()=>{

              }}
              autoComplete="off">
            <Form.Item
                label="Телефон"
                name="phone"
                rules={[{
                    required: true,
                    message: 'Введите новый номер телефона:'
                }]}>
                <Input/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item>
        </Form>)

    const updateAvatarPathForm = (
        <Form name="registration"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              style={{
                  marginTop: "49%",
                  marginRight: "30px",
                  width: 300
              }}
              onFinish={()=>{

              }}
              onFinishFailed={()=>{

              }}
              autoComplete="off">
            <Form.Item
                label="URL аватарки:"
                name="avatar"
                rules={[{
                    required: true,
                    message: 'Укажите новый URL аватарки:'
                }]}>
                <Input/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item>
        </Form>)

    return (
        <>
            <Space direction="vertical"
                   size="large"
                   style={{
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: "space-around",
                       alignItems: "center",
                       marginTop: '30px',
                       marginLeft: '8px',
                       background: 'white',
                       border: true,
                       borderRadius: '10px'
                   }}>
                <Avatar
                    user={user}
                    direction={"vertical"}
                    size={"middle"}
                    align={"baseline"}
                    style={{display: 'block', margin: '10px', flexDirection: "row", alignItems: "center"}}/>
                <InfoFields
                    setUpdateName={setUpdateName}
                    setUpdateEmail={setUpdateEmail}
                    setUpdatePhoneNumber={setUpdatePhoneNumber}
                    setUpdateAvatarPath={setUpdateAvatarPath}
                    direction={"vertical"}
                    size={"large"}
                    align={"baseline"}
                    user={user}
                    style={{display: 'block', margin: '10px', flexDirection: "column", alignItems: "start"}}/>

                <Button style={{marginLeft: "8px", marginBottom: "8px"}} type="primary" onClick={() => {
                    localStorageWorker.delete("userid");
                    localStorageWorker.delete("token");
                    localStorageWorker.save("menu", "inventory");
                    navigate("/inventory")
                }}>Выйти</Button>
            </Space>
            <Space style={{display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                marginTop: "30px",
                marginLeft: "8px",
                width: "400px",
                backgroundColor: "white",
                border: "solid",
                borderColor: "white",
                borderRadius: "10px"
            }}>
                {
                    updateName
                        ?
                        <Col>
                            {updateNameForm}
                        </Col>
                        :
                        <></>
                }
                {
                    updateEmail
                        ?
                        <Col>
                            {updateEmailForm}
                        </Col>
                        :
                        <></>
                }
                {
                    updatePhoneNumber
                        ?
                        <Col>
                            {updatePhoneNumberForm}
                        </Col>
                        :
                        <></>
                }
                {
                    updateAvatarPath
                        ?
                        <Col>
                            {updateAvatarPathForm}
                        </Col>
                        :
                        <></>
                }
            </Space>
        </>
    );
};

export default PersonalInformationField;