import React, {useEffect, useState} from 'react';
import Cart from "../../components/cart/Cart";
import CartApi from "../../api/cart/CartApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";

const CartWindow = () => {

    let cartApi = new CartApi()
    let local = new LocalStorageWorker()

    let [data, setData] = useState([1])
    let [total, setTotal] = useState(0)
    let navigate = useNavigate()

    useEffect(()=>{
        cartApi.getTotalProduct(local.get("userid"))
            .then(response => {
                setTotal(response.data)
                cartApi.getByUserId(local.get("userid"),local.get("token"))
                    .then(response=>setData(response.data.cart))
                    .catch(error=>{
                        console.log(error)
                    })
            })
            .catch(error=>{
                navigate("/authorization")
                console.log(error)
            })
    },[])

    return (
        <>
            <Cart data={data}/>
        </>
    );
};

export default CartWindow;