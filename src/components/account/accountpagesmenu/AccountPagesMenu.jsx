import React from 'react';
import {
    CheckOutlined,
    HeartOutlined,
    IdcardOutlined,
    ShoppingOutlined,
    WalletOutlined
} from "@ant-design/icons";
import {Menu} from "antd";
import {NavLink} from "react-router-dom";

const AccountPagesMenu = (props) => {
    const items = [
        {
            icon: <IdcardOutlined/>,
            label: <NavLink to="/account/info">Личная информация</NavLink>,
            key: 'info',
        },
        {
            icon: <CheckOutlined />,
            label: <NavLink to="/account/orders">Мои заказы</NavLink>,
            key: 'orders',
        },
        // {
        //     icon: <ShoppingOutlined/>,
        //     label: <NavLink to="/account/purchases">Мои покупки</NavLink>,
        //     key: 'purchases',
        // },
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

    const onClick = (e) => {
        props.setCurrentLeft(e.key);
    };

    return (
            <Menu style={{display: 'block', marginTop: '30px',fontSize: "medium"}}
                  onClick={onClick}
                  selectedKeys={props.currentLeft}
                  theme="light"
                  mode="vertical"
                  items={items}/>
    );
};

export default AccountPagesMenu;