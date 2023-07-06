import React from 'react';
import {Divider, Space} from "antd";
import "./PersonalInformationStyles.css"

const InfoFields = (props) => {

    let style = props.style

    let direction = props.direction
    let size = props.size
    let align = props.align

    let user = props.user
    let name = user.name
    let email = user.email

    return (
        <Space
            direction={direction}
            style={style}
            size={size}
            align={align}>
            <p className="text-style">
                Имя: {name}
            </p>
            <Divider/>
            <p className="text-style">
                Почта: {email}
            </p>
        </Space>
    );
};

export default InfoFields;