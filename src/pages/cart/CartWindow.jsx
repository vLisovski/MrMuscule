import React, {useEffect, useState} from 'react';
import Cart from "../../components/cart/Cart";
import CartApi from "../../api/cart/CartApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";
import {Button, Dropdown, Pagination, Space} from "antd";
import {DownOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import ModalButton from "../../components/shared/ModalButton";
import ShopPageApi from "../../api/shop/ShopPageApi";
import UsersApiWorker from "../../api/user/UsersApiWorker";

const CartWindow = (props) => {

    let cartApi = new CartApi()
    let shopPageApi = new ShopPageApi()
    let local = new LocalStorageWorker()

    let [data, setData] = useState([])
    let [total, setTotal] = useState(0)
    let [limit, setLimit] = useState(3)
    let [offset, setOffset] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)
    let [buyBonuses, setBuyBonuses] = useState(0)
    let [cost, setCost] = useState(0)
    let [bonusBalance, setBonusBalance] = useState(500)
    let navigate = useNavigate()
    let userApi = new UsersApiWorker()

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
                local.save("cartcount", response.data)
                cartApi.getByUserId(local.get("userid"), local.get("token"), limit, offset)
                    .then(response => setData(response.data.cart))
                    .catch(error => {
                        console.log(error)
                    })
                setBonusBalance(userApi.getBonusBalance(local.get("userid"), local.get("token"))
                    .then((response) => {
                        setBonusBalance(response.data)
                    }))
            })
            .catch(error => {
                setTotal(local.get("cart").split(",").length)
                local.save("cartcount", local.get("cart").split(",").length)
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


    }, [limit, offset])

    //TODO сделать пагинацию при logout корзине
    //TODO исправить поведение "добавлено в корзину" на карточках с товаром
    //TODO дописать все поля на карточках товаров
    //TODO в модальном окне добавить поле с балансом бонусов
    //TODO привязать кнопку офорить заказ к api методу
    //TODO не отрисовывать кнопку оформления заказа, если ошибка получения данных с сервера
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
                    <Cart updateCartCounter={props.updateCartCounter}
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
                        </>
                        :
                        <p style={{fontSize: "35px"}}><ShoppingCartOutlined style={{color: "darkgray"}}/> Корзина пуста
                        </p>
                }

                {
                    data.length > 0
                        ?
                        <>
                            <ModalButton callBackFromDeleteClick={callBackFromDeleteClick} bonusBalance={bonusBalance} buyBonuses={buyBonuses} cost={cost}
                                         navigate={navigate}/>
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
        </>
    );
};

export default CartWindow;