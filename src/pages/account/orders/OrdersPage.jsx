import React, {useEffect, useState} from 'react';
import {Alert, Col, List, Space, Spin} from "antd";
import OrderApi from "../../../api/order/OrderApi";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";

const OrdersPage = (props) => {

    let [orders, setOrders] = useState([])
    let [loading, setLoading] = useState(true)
    let orderApi = new OrderApi()
    let local = new LocalStorageWorker()

    useEffect(()=>{
        props.setCurrentLeft("orders")
        orderApi.getOrdersByUserId(local.get("userid"), local.get("token"))
            .then((response) => {
                local.save("location",window.location.href)
                setOrders(response.data)
                setLoading(false)
            })
            .catch(error=>{
                console.log("ORDERS GET ERROR"+error)
                setLoading(false)
            })
    },[])


    return (
        <Space style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "start",marginTop:"30px"}}>
            <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap",justifyContent: "center"}}
                 span={24}
            >
                {
                    loading
                        ?
                        <Spin>
                            <Alert
                                message="Грузим заказы..."
                                description="Длительность загрузки зависит от Вашей сети"
                                type="info"
                                style={{
                                    paddingRight: '25px',
                                    paddingTop: '50px',
                                    paddingBottom: '25px',
                                    margin: '8px',
                                }}
                            />
                        </Spin>
                        :
                        <List
                            grid={{
                                gutter: 1,
                                column: 1,
                            }}
                            itemLayout="vertical"
                            size="large"
                            responsive
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 2,
                                align: "center"
                            }}
                            dataSource={orders}
                            renderItem={(order, index) => (
                                <List.Item key={index}>
                                    <Card title={"ID заказа: "+order.id}>
                                        <Meta
                                            title={
                                                <>
                                                    <>Дата заказа: {order.date}</>
                                                    <br/>
                                                    <>Стоимость заказа: {order.cost} руб.</>
                                                </>
                                            }
                                            description={
                                                <>
                                                    <div style={{color: "green"}}>Комментарий к заказу:</div>
                                                    <>{order.description}</>
                                                    <br/>
                                                    <br/>
                                                    <div style={{color: "green"}}>Список продуктов:</div>
                                                    <div style={{color: "blue"}}>
                                                        {
                                                            order.productList.map((product)=>{
                                                                return <> {product.name}</>
                                                            })
                                                        }
                                                    </div>

                                                </>
                                            }
                                        />
                                    </Card>
                                </List.Item>
                            )}
                        />
                }
            </Col>
        </Space>
    );
};

export default OrdersPage;