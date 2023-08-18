import React from 'react';
import {Divider, Space} from "antd";

const Footer = () => {
    return (
        <>
            <Divider style={{marginTop: "280px"}}/>
            <Space style={{maxHeight: "20px",minHeight: "10px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <p style={{color: "blue"}}>Lisovski V.S.,</p>
                <p style={{color: "blue"}}>education project, 2023,</p>
                <p style={{color: "blue"}}>It-Park</p>
            </Space>
        </>
    );
};

export default Footer;