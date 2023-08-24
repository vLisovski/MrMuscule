import React from 'react';
import {Space, Avatar, List, Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const Cart = (props) => {

    let data = props.data

    return (
        <Space style={{
            display: "flex",
            flexDirection:"co",
            alignContent:"center",
            alignItems:"center",
            marginTop: "30px"}}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.photoPath} />}
                            title={<p>{item.name}</p>}
                            description={
                                <>
                                    <p>{item.description}</p>
                                    <p>{item.price }руб.</p>
                                    <p>{item.type}</p>
                                </>
                            }
                        />
                        <Button><CloseOutlined onClick={() => {

                        }} /></Button>
                    </List.Item>
                )}
            />
        </Space>
    );
};

export default Cart;