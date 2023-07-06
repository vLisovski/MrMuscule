import React from 'react';
import {Space} from "antd";
import Footer from "../../components/footer/Footer";

const AuthPage = () => {
    return (
        <>
            <Space style={{
                display: "flex",
                flexDirection:"row",
                alignContent:"center",
                alignItems:"center",
                marginTop: "30px"}}>
                <p>Авторизация</p>
            </Space>
            <Footer/>
        </>

    );
};

export default AuthPage;