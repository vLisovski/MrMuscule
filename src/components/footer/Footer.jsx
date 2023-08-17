import React from 'react';
import {Divider, Space} from "antd";

const Footer = () => {
    return (
        <>
            <Divider style={{marginTop: "300px"}}/>
            <Space style={{maxHeight: "50px",minHeight: "50px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <p style={{color: "blue"}}>Lisovski V.S.,</p>
                <p style={{color: "blue"}}>education project, 2023,</p>
                <p style={{color: "blue"}}>It-Park</p>
            </Space>
        </>
    );
};

export default Footer;