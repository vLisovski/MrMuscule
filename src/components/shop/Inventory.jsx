import React from 'react';
import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";

const Inventory = (props) => {

    let cards = props.cards

    return cards.map((item) => {
        return(<Card
            key={item.id}
            style={{background: 'white', marginTop: '30px' , marginLeft: '8px', width: "240px",display: "flex", flexDirection: "column", alignItems: "center"}}
            size={"default"}
            hoverable
            bordered={true}
            cover={<Image alt="inventory" style={{alignSelf: "center"}} width={240} src={item.photoPath}/>}
            >
            <Meta
                bodyStyle={{display: "flex", flexDirection: "column", alignItems: "flex-start", alignContent: "flex-start"}}
                title={item.name}
                description={item.description}/>
        </Card>)
    })
};

export default Inventory;