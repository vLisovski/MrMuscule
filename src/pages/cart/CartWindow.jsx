import React, {useEffect, useState} from 'react';
import Cart from "../../components/cart/Cart";
import CartApi from "../../api/cart/CartApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Col, Space} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import MakeOrderButton from "./MakeOrderButton";
import ShopPageApi from "../../api/shop/ShopPageApi";
import UsersApiWorker from "../../api/user/UsersApiWorker";

const CartWindow = (props) => {

    let cartApi = new CartApi()
    let shopPageApi = new ShopPageApi()
    let local = new LocalStorageWorker()

    let [data, setData] = useState([])
    let [buyBonuses, setBuyBonuses] = useState(0)
    let [cost, setCost] = useState(0)
    let [bonusBalance, setBonusBalance] = useState(0)
    let [bonusBoost, setBonusBoost]= useState(0);
    let [authorized, setAuthorized] = useState(false)
    let navigate = useNavigate()
    let userApi = new UsersApiWorker()

    useEffect(() => {
        props.setCurrent("cart")
        cartApi.getByUserId(local.get("userid"), local.get("token"))
            .then(response => {
                setAuthorized(true)
                console.log("RESPONSE DATA CART"+response.data.cart)
                setData(response.data.cart)
                console.log("DATA"+data)
                let bb = 0
                data.map((item)=>{
                   bb += item.bonuses
                })
                console.log("BB"+bb)
                setBonusBoost(bb)
                props.setCart(data.map((item)=>{
                    return item.id
                }))
                console.log("CART IN CARTWINDOW" + data.map((item)=>{
                    return item.id
                }))
                console.log("DATA CART LENGTH: "+response.data.cart.length)
                props.updateCartCounter(response.data.cart.length)
                userApi.getBonusBalance(local.get("userid"), local.get("token"))
                    .then((response) => {
                        setBonusBalance(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            )
            .catch(error => {
                setAuthorized(false)
                console.log(error)
                if(local.get("cart")!==""){
                    props.updateCartCounter(local.get("cart").split(",").length)
                    local.save("cartcount", local.get("cart").split(",").length)
                }else{
                    props.updateCartCounter(0);
                    local.save("cartcount", 0)
                }
                shopPageApi.getAllByProductsIds({
                    ids: local.get("cart")
                })
                    .then(response => {
                        setData(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
       callBackFromDeleteClick()

    }, [])

    useEffect(()=>{
        cartApi.getByUserId(local.get("userid"), local.get("token"))
            .then(response => {
                    setAuthorized(true)
                    console.log("RESPONSE DATA CART"+response.data.cart)
                    setData(response.data.cart)
                    console.log("DATA"+data)
                    let bb = 0
                    data.map((item)=>{
                        bb += item.bonuses
                    })
                    console.log("BB"+bb)
                    setBonusBoost(bb)
                    props.setCart(data.map((item)=>{
                        return item.id
                    }))
                    console.log("CART IN CARTWINDOW" + data.map((item)=>{
                        return item.id
                    }))
                    console.log("DATA CART LENGTH: "+response.data.cart.length)
                    props.updateCartCounter(response.data.cart.length)
                    userApi.getBonusBalance(local.get("userid"), local.get("token"))
                        .then((response) => {
                            setBonusBalance(response.data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            )
            .catch(error => {
                setAuthorized(false)
                console.log(error)
                if(local.get("cart")!==""){
                    props.updateCartCounter(local.get("cart").split(",").length)
                    local.save("cartcount", local.get("cart").split(",").length)
                }else{
                    props.updateCartCounter(0);
                    local.save("cartcount", 0)
                }
                shopPageApi.getAllByProductsIds({
                    ids: local.get("cart")
                })
                    .then(response => {
                        setData(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
        callBackFromDeleteClick()
    },[authorized])

    const callBackFromDeleteClick = () => {

        setBuyBonuses(() => {
            let summ = 0
            for (let i = 0; i < data.length; i++) {
                summ = summ + data[i].bonuses
            }
            return summ
        })

        setCost(() => {
            let summ = 0
            for (let i = 0; i < data.length; i++) {
                summ = summ + data[i].price
            }
            return summ
        })
    }

    return (
        <>
            {
                data.length > 0
                    ?
                    <Cart cartCount={props.cartCount} updateCartCounter={props.updateCartCounter}
                          data={data}/>
                    : <></>
            }

            <Space style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "30px"
            }}>
                {
                    data.length > 0
                        ?
                        <>
                        </>
                        :
                        <p style={{fontSize: "35px"}}><ShoppingCartOutlined style={{color: "darkgray"}}/>Корзина пуста</p>
                }
                {
                    data.length > 0
                        ?
                        <>
                            {authorized ? <MakeOrderButton data={data} callBackFromDeleteClick={callBackFromDeleteClick} bonusBalance={bonusBalance} buyBonuses={buyBonuses} bonusBoost={bonusBoost} cost={cost}
                                                           navigate={navigate}/> : <></>}
                            <Button onClick={() => {
                                cartApi.clearCart(local.get("userid"), local.get("token")).catch(error => console.log(error))
                                local.save("cart", [])
                                local.save("cartcount", 0)
                                window.location.reload()
                            }}>Очистить корзину</Button>
                        </>
                        :
                        <></>
                }
            </Space>
            <Space style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "30px"
            }}>
                {!authorized && data.length > 0
                    ?
                    <Col span={24}>
                        <p style={{color: "black"}}>
                            <NavLink to="/authorization">Авторизируйтесь</NavLink>, чтобы сделать заказ
                        </p>
                    </Col>
                    :
                    <></>}
            </Space>
        </>
    );
};

export default CartWindow;