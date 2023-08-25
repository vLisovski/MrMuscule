import React from 'react';
import {List, Button, Col, Image, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined} from "@ant-design/icons";
import CartApi from "../../api/cart/CartApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";

const Cart = (props) => {

    let data = props.data
    let cartApi = new CartApi()
    let local = new LocalStorageWorker()
    let navigation = useNavigate()
    return (
        <Col span={16} offset={4} style={{
            marginTop: "30px"
        }}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta
                            avatar={<Image src={item.photoPath} width={250}/>}
                            title={<p>{item.name}</p>}
                            description={
                                <>
                                    <p>{item.description}</p>
                                    <p><Card style={{width: "150px"}} key={index}><Meta
                                        bodyStyle={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            alignContent: "flex-start",
                                        }}
                                        title={<>{item.price} руб.</>}
                                    /></Card>
                                    </p>
                                    <p>{item.type}</p>
                                </>
                            }
                        />
                        <Button style={{width: "60px", height: "40px"}} onClick={() => {
                            cartApi.deleteProduct(item.id, local.get("token"))
                                .then(alert("товар удален из корзины"))
                                .catch(error => {
                                    local.save("location", window.location.href)
                                    navigation("/authorization")
                                    console.log(error)
                                })
                            window.location.reload()
                        }}><DeleteOutlined style={{fontSize: "20px"}}/></Button>
                    </List.Item>
                )}
            />
        </Col>
    );
};

export default Cart;