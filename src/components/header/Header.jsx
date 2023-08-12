import React from 'react';
import {Menu} from 'antd';
import {useState} from 'react';
import {HomeOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom"
const items = [
    {
        icon: <HomeOutlined/>,
        label: <strong>MUSCULE.RU</strong>,
        key: 'main'
    },
    {
        label: <NavLink to="/inventory">Инвентарь</NavLink>,
        key: 'inventory',

    },
    {
        label: <NavLink to="/clothes">Одежда</NavLink>,
        key: 'clothes',
    },
    {
        label: <NavLink to="/food">Добавки</NavLink>,
        key: 'food',
        disabled: false
    },
    {
        icon:<NavLink to="/account/info"><UserOutlined /></NavLink>,
        key: 'account',
        style: { float: 'right' },
    },
    {
        icon:<NavLink to="/cart"><ShoppingCartOutlined/></NavLink>,
        key: 'cart',
        style: { float: 'right' },
    },
];
const Header = () => {
    const [current, setCurrent] = useState('inventory');

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu style={{ display: 'block',fontSize:"medium", height: '50px' }}
              onClick={onClick}
              selectedKeys={[current]}
              theme="light"
              mode="horizontal"
              items={items}/>
    );
};

export default Header;