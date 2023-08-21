import React from 'react';
import {Card,Space} from "antd";
import Meta from "antd/es/card/Meta";

const BonusBalance = (props) => {
    let balance = props.balance
    return (
        <>
            <Space direction="horizontal"
                size="large"
                style={{display: 'flex',
                flexDirection: 'row',
                background: 'white',
                marginLeft: "8px",
                marginTop: "30px",
                border: true,
                borderRadius: '10px'}}>
                <Card style={{background: 'white', marginTop: '1px' , marginLeft: '8px',marginRight: '8px'}}
                      size={"default"}
                      bordered={true}
                      hoverable={false}>
                    <Meta title={'Бонусов накоплено:'}
                          description={balance}>
                    </Meta>
                </Card>

            </Space>
        </>
    );
};

export default BonusBalance;