import React from 'react';
import {Card, Image, Skeleton} from "antd";
import Meta from "antd/es/card/Meta";

const PurchasesField = (props) => {

    let loading = props.loading
    return props.cards.map((item) => {
        return (<Card
            key={item.id}
            style={{
                background: 'white',
                marginTop: '30px',
                marginLeft: '8px',
                width: "250px",
            }}
            size={"default"}
            hoverable
            bordered={true}
            cover={<Image alt="inventory" style={{alignSelf: "center"}} width={250} src={item.photoPath}/>}
        >
            <Skeleton loading={loading} avatar active>
                <Meta
                    bodyStyle={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        alignContent: "flex-start"
                    }}
                    title={item.name}
                    description={item.description}/>
            </Skeleton>
        </Card>)
    })
};

export default PurchasesField;