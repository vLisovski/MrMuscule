import React from 'react';
import {Divider, Space} from "antd";

const NoFoundPage = () => {
    return (
        <Space style={{
            display: "flex",
            flexDirection:"row",
            alignContent:"center",
            alignItems:"center",
            justifyContent: "center",
            marginTop: "30px"}}>
            <Divider/>
            <strong>PAGE NOT FOUND</strong>
            <Divider/>
        </Space>
    );
};

export default NoFoundPage;