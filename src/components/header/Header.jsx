import React from 'react';
import {Menu} from 'antd';
import {useState} from 'react';
import {HomeOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";

const items = [
    {
        icon: <HomeOutlined/>,
        label: <strong>MUSCULE.RU</strong>,
        key: 'start',
    },
    {
        label: 'Инвентарь',
        key: 'inventory',

    },
    {
        label: 'Одежда',
        key: 'clothes',
        disabled: true,
    },
    {
        label: 'Питание',
        key: 'feed',
        children: [
            {
                type: 'group',
                label: 'Protein',
                children: [
                    {
                        label: 'Muscule',
                        key: 'muscule',
                    },
                    {
                        label: 'Wild Food',
                        key: 'wildfood',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Vitamines',
                children: [
                    {
                        label: 'B2',
                        key: 'b2',
                    },
                    {
                        label: 'B3',
                        key: 'b3',
                    },
                ],
            },
        ],
    },
    {
        icon: <UserOutlined />,
        key: 'user',
        style: { float: 'right' },
    },
    {
        icon: <ShoppingCartOutlined/>,
        key: 'shoppingCart',
        style: { float: 'right' },
    },
];
const Header = () => {
    const [current, setCurrent] = useState('start');
    const onClick = (e) => {
        console.log('click ', e);
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