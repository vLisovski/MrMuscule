import React, {useEffect} from 'react';
import {List, Col, Image, Card} from "antd";
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
                    <List.Item key={index} actions={[
                       <DeleteOutlined style={{fontSize: "20px", color: "black"}} onClick={() => {
                           let data2 = data.filter((item)=>item.id!==data[index].id)
                           let data3 = []
                           for (let i = 0; i < data2.length; i++) {
                               data3.push(data2[i].id)
                           }
                           local.save("cart", data2)
                           props.updateCartCounter(data2.length)
                           let deletedItem = {
                               userId: local.get("userid"),
                               productId: item.id
                           }
                           cartApi.deleteProduct(deletedItem, local.get("token"))
                               .then(()=>{
                                   console.log("товар " + item.name +" удален из корзины")
                                   //props.updateCartCounter(props.cartCount-1)
                               })
                               .catch(error => {
                                   //local.save("location", window.location.href)
                                   //navigation("/authorization")
                                   console.log(error)
                               })
                           window.location.reload()
                       }} />
                    ]}>
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
                    </List.Item>
                )}
            />
        </Col>
    );
};

export default Cart;