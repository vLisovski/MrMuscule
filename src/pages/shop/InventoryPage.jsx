import React from 'react';

import Footer from "../../components/footer/Footer";
import {Space} from "antd";

const InventoryPage = () => {
    return (
        <>
            <Space style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: "30px"
            }}>
                <p>Инвентарь</p>
            </Space>
            <Footer/>
        </>
    );
};

export default InventoryPage;