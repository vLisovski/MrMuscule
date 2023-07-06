import React, {useState} from 'react';
import {
    HeartOutlined,
    IdcardOutlined,
    RestOutlined,
    ShoppingOutlined,
    WalletOutlined
} from "@ant-design/icons";
import {Menu} from "antd";

const AccountPagesMenu = () => {
    const items = [
        {
            icon: <IdcardOutlined/>,
            label: 'Личная информация',
            key: 'personal_information',
        },
        {
            icon: <ShoppingOutlined/>,
            label: 'Мои покупки',
            key: 'my_purchases',
        },
        {
            icon: <RestOutlined/>,
            label: 'Мои возвраты',
            key: 'my_returns',
        },
        {
            icon: <WalletOutlined/>,
            label: 'Мои бонусы',
            key: 'my_bonuses',
        },
        {
            icon: <HeartOutlined/>,
            label: 'Избранное',
            key: 'favorite',
        }
    ];

    const [current, setCurrent] = useState('personal_information');
    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
            <Menu style={{display: 'block', marginTop: '30px',fontSize: "medium"}}
                  onClick={onClick}
                  selectedKeys={[current]}
                  theme="light"
                  mode="vertical"
                  items={items}/>
    );
};

export default AccountPagesMenu;