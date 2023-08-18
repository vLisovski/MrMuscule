import React from 'react';
import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";
import {ShoppingCartOutlined, StarOutlined} from "@ant-design/icons";

const ShopItems = (props) => {

    let cards = props.cards

    return cards.map((item) => {
        return(<Card
            key={item.id}
            style={{
                background: 'white',
                marginTop: '30px',
                marginLeft: '8px',
                width: "250px",
            }}
            actions={[
                <ShoppingCartOutlined key="cart"/>,
                <StarOutlined  key="favorite" />,
            ]}
            size={"default"}
            hoverable
            bordered={true}
            cover={<Image alt="inventory" style={{alignSelf: "center"}} width={250} src={item.photoPath}/>}
            >
            <Meta
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "flex-start", alignContent: "flex-start"}}
                title={item.name}
                description={item.description}/>
        </Card>)
    })
};

export default ShopItems;