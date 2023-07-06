import React from 'react';
import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";

const Favorite = (props) => {
    let favorite = props.favorite

    return favorite.map((item) => {
        return(<Card
            style={{background: 'white', marginTop: '30px' , marginLeft: '8px'}}
            size={"small"}
            bordered={true}
            cover={<Image alt="purchase" width={250} src={item.imgSrc}/>}
            hoverable={false}>
            <Meta
                title={item.title}
                description={item.description}/>
        </Card>)
    })
};

export default Favorite;