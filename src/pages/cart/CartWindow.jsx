import React, {useEffect, useState} from 'react';
import Cart from "../../components/cart/Cart";
import CartApi from "../../api/cart/CartApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";
import {Button, Dropdown, Pagination, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import ModalButton from "../../components/shared/ModalButton";
import ShopPageApi from "../../api/shop/ShopPageApi";

const CartWindow = () => {

    let cartApi = new CartApi()
    let shopPageApi = new ShopPageApi()
    let local = new LocalStorageWorker()

    let [data, setData] = useState([1])
    let [total, setTotal] = useState(0)
    let [limit, setLimit] = useState(3)
    let [offset, setOffset] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)
    let navigate = useNavigate()

    const onClick = ({key}) => {
        setLimit(key)
    };

    const onChange = (page) => {
        setCurrentPage(page)
        setOffset(limit * (page - 1))
    }

    const items = [
        {
            label: "3",
            key: '3',
        },
        {
            label: '6',
            key: '6',
        },
        {
            label: '9',
            key: '9',
        },
    ];

    useEffect(() => {
        cartApi.getTotalProduct(local.get("userid"), local.get("token"))
            .then(response => {
                setTotal(response.data)
                cartApi.getByUserId(local.get("userid"), local.get("token"), limit, offset)
                    .then(response => setData(response.data.cart))
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                setTotal(local.get("cart").length)
                console.log(local.get("cart").length)
                console.log("CART " + local.get("cart"))
                shopPageApi.getAllByProductsIds({
                    ids: local.get("cart")
                })
                    .then(response => {
                        setData(response.data)
                        console.log("RESPONSE" + response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
                console.log(error)
            })
    }, [limit, offset])

    return (
        <>
            <Cart data={data}/>
            <Space style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "30px"
            }}>
                <Pagination onChange={onChange}
                            defaultCurrent={1}
                            defaultPageSize={1}
                            total={total}
                            pageSize={limit}
                            current={currentPage}/>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Товаров на странице:
                            <DownOutlined/>
                        </Space>
                    </a>
                </Dropdown>
                <ModalButton>Сделать заказ</ModalButton>
                <Button onClick={() => {
                    cartApi.clearCart(local.get("userid"), local.get("token")).catch(error=>console.log(error))
                    local.save("cart", [])
                    window.location.reload()
                }}>Очистить корзину</Button>
            </Space>
        </>
    );
};

export default CartWindow;