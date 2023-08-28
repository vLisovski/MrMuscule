import React, {useEffect} from 'react';
import {Menu, Space} from 'antd';
import {useState} from 'react';
import {HomeOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom"
import LocalStorageWorker from "../../storage/LocalStorageWorker";

const IconText = ({ icon, text }) => (
    <>
        {icon}
        {text}
    </>
);

const Header = (props) => {
    const localStorageWorker = new LocalStorageWorker();
    let [current, setCurrent] = useState(localStorageWorker.get("menu"));

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

    // const[currentPlace,setCurrentPlace] = useState(navigate.options.currentLocation);
    const onClick = (e) => {
        localStorageWorker.save("menu",e.key)
        setCurrent(localStorageWorker.get("menu"))
    };

    useEffect(()=>{
        setCurrent(localStorageWorker.get("menu"))
    },[window.location.href]);

    return (
        <Menu style={{ display: 'block',
            fontSize:"medium",
            height: '50px',
            backgroundColor: "white",
            boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.2)"}}
              onClick={onClick}
              selectedKeys={current}
              theme="light"
              mode="horizontal"
              items={items}/>
    );
};

export default Header;