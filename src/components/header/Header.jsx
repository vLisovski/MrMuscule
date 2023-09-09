import React from 'react';
import {Menu, Space} from 'antd';
import {HomeOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom"

const IconText = ({ icon, text }) => (
    <>
        {icon}
        {text}
    </>
);

const Header = (props) => {

    const items = [
        {
            icon: <HomeOutlined/>,
            label: <Space style={{fontSize: "larger"}}><strong>MUSCULE.RU</strong></Space>,
            key: 'main'
        },
        {
            label: <NavLink to="/inventory"><Space style={{fontSize: "larger"}}>Инвентарь</Space></NavLink>,
            key: 'inventory',

        },
        {
            label: <NavLink to="/clothes"><Space style={{fontSize: "larger"}}>Одежда</Space></NavLink>,
            key: 'clothes',
        },
        {
            label: <NavLink to="/food"><Space style={{fontSize: "larger"}}>Добавки</Space></NavLink>,
            key: 'food',
            disabled: false
        },
        {
            label: <NavLink to="/target"><Space style={{fontSize: "larger"}}>Наборы</Space></NavLink>,
            key: 'target',
        },
        {
            icon:<NavLink to="/account/info"><UserOutlined style={{ fontSize: '21px', color: '#000000' }}/></NavLink>,
            key: 'account',
            style: { float: 'right',marginTop: "2px"},
        },
        {
            icon:
                <NavLink to="/cart">
                    <IconText
                        icon = {<ShoppingCartOutlined style={{ fontSize: '21px', color: '#000000' }} />}
                        text = {<a style={{fontSize: '15px', color: 'black'}}>{props.cartCount}</a>}
                    >
                    </IconText>
                </NavLink>,
            key: 'cart',
            style: { float: 'right', marginTop: "2px"},
        },
    ];

    return (
        <Menu style={{ display: 'block',
            fontSize:"medium",
            height: '50px',
            backgroundColor: "white",
            boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.2)"}}
              // onClick={onClick}
              selectedKeys={props.current}
              theme="light"
              mode="horizontal"
              items={items}/>
    );
};

export default Header;