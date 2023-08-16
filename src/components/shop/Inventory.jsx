import React from 'react';
import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";

const Inventory = (props) => {

    let cards = props.cards

    return cards.map((item) => {
        return(<Card
            key={item.id}
            style={{background: 'white', marginTop: '30px' , marginLeft: '8px'}}
            size={"small"}
            bordered={true}
            cover={<Image alt="inventory" width={250} src={item.imgSrc}/>}
            hoverable={false}>
            <Meta
                title={item.name}
                description={item.description}/>
        </Card>)
    })
};

export default Inventory;