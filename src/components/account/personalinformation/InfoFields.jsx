import React from 'react';
import {Button, Divider, Space} from "antd";
import "./PersonalInformationStyles.css"

const InfoFields = (props) => {

    let style = props.style

    let direction = props.direction
    let size = props.size
    let align = props.align

    let user = props.user
    let name = user.name
    let email = user.email
    let phoneNumber = user.phoneNumber

    const setUpdateName = props.setUpdateName
    const setUpdateEmail = props.setUpdateEmail
    const setUpdatePhoneNumber = props.setUpdatePhoneNumber
    const setUpdateAvatarPath = props.setUpdateAvatarPath

    return (
        <Space
            direction={direction}
            style={style}
            size={size}
            align={align}>
            <Button onClick={()=>{
                setUpdateName(false)
                setUpdateEmail(false)
                setUpdatePhoneNumber(false)
                setUpdateAvatarPath(true)
            }}>Изменить аватар</Button>
            <p className="text-style">
                Имя: {name}
            </p>
            <Button onClick={()=>{
                setUpdateName(true)
                setUpdateEmail(false)
                setUpdatePhoneNumber(false)
                setUpdateAvatarPath(false)
            }}>Изменить имя</Button>
            <Divider/>
            <p className="text-style">
                Почта: {email}
            </p>
            <Button onClick={()=>{
                setUpdateName(false)
                setUpdateEmail(true)
                setUpdatePhoneNumber(false)
                setUpdateAvatarPath(false)
            }}>Изменить почту</Button>
            <Divider/>
            <p className="text-style">
                Телефон: {phoneNumber}
            </p>
            <Button onClick={()=>{
                setUpdateName(false)
                setUpdateEmail(false)
                setUpdatePhoneNumber(true)
                setUpdateAvatarPath(false)
            }}>Изменить телефон</Button>
        </Space>
    );
};

export default InfoFields;