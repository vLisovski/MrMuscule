import React from 'react';
import {Space} from "antd";

const Cart = () => {
    return (
        <Space style={{
            display: "flex",
            flexDirection:"row",
            alignContent:"center",
            alignItems:"center",
            marginTop: "30px"}}>
            <p>Корзина товаров</p>
        </Space>
    );
};

export default Cart;