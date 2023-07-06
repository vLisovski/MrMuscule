import React from 'react';
import {Image, Space} from "antd";

const Avatar = (props) => {

    let user = props.user

    let direction = props.direction
    let size = props.size
    let align = props.align

    let avatarSrc = user.avatarSrc
    let style = props.style

    return (
        <Space
            style={style}
            direction={direction}
            size={size}
            align={align}>
            <Image
                src={avatarSrc}
                style={{
                    border: true,
                    borderRadius: '50%'
                }}
                width={350}/>
        </Space>
    );
};

export default Avatar;