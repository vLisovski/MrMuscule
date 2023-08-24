import React, {useState} from 'react';
import {Alert, Button, Col, Form, Image, Input, Space, Spin} from "antd";

import Avatar from "../../shared/Avatar";
import InfoFields from "./InfoFields";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";
import UsersApiWorker from "../../../api/user/UsersApiWorker";

const PersonalInformationField = (props) => {

    let localStorageWorker = new LocalStorageWorker();
    let userApi = new UsersApiWorker()
    let user = props.user
    let navigate = useNavigate();

    let [updateName, setUpdateName] = useState(false)
    let [updateEmail, setUpdateEmail] = useState(false)
    let [updatePhoneNumber, setUpdatePhoneNumber] = useState(false)
    let [updateAvatarPath, setUpdateAvatarPath] = useState(false)
    let [currentInput,setCurrentInput] = useState(" ");

    const updateNameForm = (
        <Form name="updateName"
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
              onFinish={() => {

              }}
              onFinishFailed={() => {

              }}
              autoComplete="off">
            <Form.Item
                label="Имя"
                name="name"
                rules={[{
                    required: true,
                    message: 'Введите новое имя:'
                }]}>
                <Input onChange={(event)=>{
                    setCurrentInput(event.target.value)
                }}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}>
                <Button type="primary" htmlType="submit" onClick={()=>{
                    userApi.updateName(localStorageWorker.get("userid"),
                        currentInput,
                        localStorageWorker.get("token"))
                        .then(()=>{
                            window.location.reload()
                            setCurrentInput("")
                        })
                        .catch(error=>{
                            console.log(error)
                    })
                }}>Сохранить</Button>
            </Form.Item>
        </Form>)

    const updateEmailForm = (
        <Form name="updateEmail"
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
              onFinish={() => {

              }}
              onFinishFailed={() => {

              }}
              autoComplete="off">
            <Form.Item
                label="Почта"
                name="email"
                rules={[{
                    required: true,
                    message: 'Введите новою почту:'
                }]}>
                <Input onChange={(event)=>{
                    setCurrentInput(event.target.value)
                }}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}>
                <Button type="primary" htmlType="submit" onClick={()=>{
                    userApi.updateEmail(localStorageWorker.get("userid"),
                        currentInput,
                        localStorageWorker.get("token"))
                        .then(()=>{
                            window.location.reload()
                            setCurrentInput("")
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                }}>Сохранить</Button>
            </Form.Item>
        </Form>)

    const updatePhoneNumberForm = (
        <Form name="updatePhoneNumber"
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
              onFinish={() => {

              }}
              onFinishFailed={() => {

              }}
              autoComplete="off">
            <Form.Item
                label="Телефон"
                name="phone"
                rules={[{
                    required: true,
                    message: 'Введите новый номер телефона:'
                }]}>
                <Input onChange={(event)=>{
                    setCurrentInput(event.target.value)
                }}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}>
                <Button type="primary" htmlType="submit" onClick={()=>{
                    userApi.updatePhoneNumber(localStorageWorker.get("userid"),
                        currentInput,
                        localStorageWorker.get("token"))
                        .then(()=>{
                            window.location.reload()
                            setCurrentInput("")
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                }}>Сохранить</Button>
            </Form.Item>
        </Form>)

    const updateAvatarPathForm = (
        <Space direction="vertical"
            style={{
                display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: '10px',
                    marginLeft: '0px',
                    background: 'white',
            }}>
            <Image width={350} src={currentInput}/>
            <Form name="updateAvatar"
                  labelCol={{
                      span: 8,
                  }}
                  wrapperCol={{
                      span: 16,
                  }}
                  style={{
                      position: "static",
                      marginTop: "49%",
                      marginRight: "30px",
                      width: 300
                  }}
                  onFinish={() => {

                  }}
                  onFinishFailed={() => {

                  }}
                  autoComplete="off">
                <Form.Item
                    label="URL аватарки:"
                    name="avatar"
                    rules={[{
                        required: true,
                        message: 'Укажите новый URL аватарки:'
                    }]}>
                    <Input onChange={(event)=>{
                        setCurrentInput(event.target.value)
                    }}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}>
                    <Button type="primary" htmlType="submit" onClick={()=>{
                        userApi.updateAvatarPath(localStorageWorker.get("userid"),
                            currentInput,
                            localStorageWorker.get("token"))
                            .then(()=>{
                                window.location.reload()
                                setCurrentInput("")
                            })
                            .catch(error=>{
                                console.log(error)
                            })
                    }}>Сохранить</Button>
                </Form.Item>
            </Form>
        </Space>
        )

    return (
        <>
            {props.loading
                ?
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
                        <Spin>
                            <Alert
                                message="Грузим профиль"
                                description="Длительность загрузки зависит от Вашей сети"
                                type="info"
                                style={{
                                    paddingRight: '25px',
                                    paddingTop: '50px',
                                    paddingBottom: '25px',
                                    margin: '8px',
                                }}
                            />
                        </Spin>
                </Space>
                :
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
                        setCurrentInput={setCurrentInput}
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
            }
            <Space style={{
                display: "flex",
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
                        <>{updateNameForm}</>
                        :
                        <></>
                }
                {
                    updateEmail
                        ?
                        <>{updateEmailForm}</>
                        :
                        <></>
                }
                {
                    updatePhoneNumber
                        ?
                        <>{updatePhoneNumberForm}</>
                        :
                        <></>
                }
                {
                    updateAvatarPath
                        ?
                        <>{updateAvatarPathForm}</>
                        :
                        <></>
                }
            </Space>
        </>
    );
};

export default PersonalInformationField;