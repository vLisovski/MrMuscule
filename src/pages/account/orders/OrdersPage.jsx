import React, {useEffect, useState} from 'react';
import {List, Space} from "antd";
import OrderApi from "../../../api/order/OrderApi";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import Card from "antd/es/card/Card";

const OrdersPage = () => {

    let [orders, setOrders] = useState([])

    let orderApi = new OrderApi()
    let local = new LocalStorageWorker()

    useEffect(()=>{
        orderApi.getOrdersByUserId(local.get("userid"), local.get("token"))
            .then((response) => {
                console.log("ORDERS RESPONSE"+response.data)
                setOrders(response.data)
            })
            .catch(error=>{
                console.log("ORDERS GET ERROR"+error)
            })
    },[])


    return (
        <Space style={{marginTop: "30px", marginLeft: "8px"}}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={orders}
                renderItem={(order, index) => (
                    <List.Item key={index}>
                        <Card title={<>
                            <p>ID заказа: {order.id}</p>
                            <p style={{color: "green"}}>Статус заказа: {order.status}</p>
                            <p>Дата заказа: {order.date}</p>
                            <p>Стоимость заказа: {order.cost} руб.</p>
                        </>}>

                                <small style={{color: "blue"}}>Список купленных товаров: </small>

                            {
                            order.productList.map((product)=>{
                                return <p>{product.name}</p>
                            })
                            }
                        </Card>
                    </List.Item>
                )}
            />
        </Space>
    );
};

export default OrdersPage;