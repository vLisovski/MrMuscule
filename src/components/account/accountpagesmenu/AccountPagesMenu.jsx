import React, {useState} from 'react';
import {
    HeartOutlined,
    IdcardOutlined,
    RestOutlined,
    ShoppingOutlined,
    WalletOutlined
} from "@ant-design/icons";
import {Menu} from "antd";
import {NavLink} from "react-router-dom";

const AccountPagesMenu = () => {
    const items = [
        {
            icon: <IdcardOutlined/>,
            label: <NavLink to="/account/info">Личная информация</NavLink>,
            key: 'info',
        },
        {
            icon: <ShoppingOutlined/>,
            label: <NavLink to="/account/purchases">Мои покупки</NavLink>,
            key: 'purchases',
        },
        {
            icon: <RestOutlined/>,
            label:<NavLink to="/account/returns">Мои возвраты</NavLink>,
            key: 'returns',
        },
        {
            icon: <WalletOutlined/>,
            label:<NavLink to="/account/bonuses">Мои бонусы</NavLink>,
            key: 'bonuses',
        },
        {
            icon: <HeartOutlined/>,
            label:<NavLink to="/account/favorite">Избранное</NavLink>,
            key: 'favorite',
        }
    ];

    const [current, setCurrent] = useState('info');
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