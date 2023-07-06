import React from 'react';
import Footer from "../../components/footer/Footer";
import {Space} from "antd";

const ClothesPage = () => {
    return (
        <>
            <Space style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: "30px"
            }}>
                <p>Одежда</p>
            </Space>
            <Footer/>
        </>
    );
};

export default ClothesPage;