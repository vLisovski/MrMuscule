import React, {useEffect, useState} from 'react';

import {Alert, Col, Dropdown, Pagination, Space, Spin} from "antd";
import ShopPageApi from "../../api/shop/ShopPageApi";
import {DownOutlined} from "@ant-design/icons";
import ShopItems from "../../components/shop/ShopItems";
import Footer from "../../components/footer/Footer";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import CartApi from "../../api/cart/CartApi";
import UsersApiWorker from "../../api/user/UsersApiWorker";
import {useNavigate} from "react-router-dom";

const InventoryPage = (props) => {

    let cartApi = new CartApi()
    let userApi = new UsersApiWorker()
    let shopPageApi = new ShopPageApi()
    let localStorageWorker = new LocalStorageWorker();
    let [loading, setLoading] = useState(true)
    let [cards, setCards] = useState([])
    let [limit, setLimit] = useState(3)
    let [offset, setOffset] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)
    let [total, setTotal] = useState(0)
    let [cart, setCart] = useState([])
    let [favorite, setFavorite] = useState([])
    let navigation = useNavigate()

    useEffect(() => {
        if(localStorageWorker.get("menu")==null){
            localStorageWorker.save("menu","inventory")
        }
        if(localStorageWorker.get("cartcounter")==null){
            localStorageWorker.save("cartcounter",0)
        }
        if(localStorageWorker.get("cartcount")==null){
            localStorageWorker.save("cartcount",0)
        }
        if(localStorageWorker.get("location")==null){
            localStorageWorker.save("location",window.location.href)
        }
        if(localStorageWorker.get("cart")==null){
            localStorageWorker.save("cart",[])
        }
        props.setCurrent("inventory")
        shopPageApi.getTotalInventory().then(response => {
            setTotal(response.data)
            if (localStorageWorker.get("token") != null && localStorageWorker.get("userid") != null) {
                userApi.getFavoritesIds(localStorageWorker.get("userid"), response.data, 0, localStorageWorker.get("token"))
                    .then(response => {
                        setFavorite(response.data)

                    }).catch(
                    () => {
                        setFavorite([])
                        setLoading(false)
                    }
                )
                cartApi.getProductIds(localStorageWorker.get("userid"),localStorageWorker.get("token"))
                    .then(response=>{
                        setCart(response.data)
                        console.log("CART" + cart)
                        localStorageWorker.save("cart", cart)
                        setLoading(false)
                    })
                    .catch(error=>{
                        console.log(error)
                        setCart(localStorageWorker.get("cart").split(","))
                        setLoading(false)
                    })
            }
        }).catch(
            error => {
                alert(error)
            }
        )

        shopPageApi.getAllInventory(limit, offset).then(response => {
            setCards(response.data)
            setLoading(false)
        }).catch(
            error => {
                alert(error)
            }
        )
    }, [limit, offset])

    useEffect(() => {
        console.log("CART" + cart)
        if(cart[0]!==''){
            props.updateCartCounter(cart.length)
        }
    }, [cart])

    useEffect(() => {
        console.log("FAVORITE " + favorite)
    }, [favorite])

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

    const onClick = ({key}) => {
        setLimit(key)
    };

    const onChange = (page) => {
        setCurrentPage(page)
        setOffset(limit * (page - 1))
    }

    return (
        <>
            <Space style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "start",
                alignItems: "stretch",
                marginTop: "30px"
            }}>
                <Space style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "start",
                    alignItems: "stretch",
                    marginLeft: "5%"
                }}>
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

                </Space>
                {
                    loading
                        ?
                        <>
                            <Col style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                flexWrap: "wrap",
                                marginLeft: "10%"
                            }}
                                 span={24}>
                                <Spin style={{marginLeft: '10px', marginTop: '10px'}}>
                                    <Alert
                                        message="Грузим инвентарь"
                                        description="Длительность загрузки зависит от Вашей сети"
                                        type="info"
                                        style={{
                                            padding: '50px',
                                            marginTop: '50px'
                                        }}
                                    />
                                </Spin>
                            </Col>
                            <Space style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                marginTop: "30px",
                            }}>
                            </Space>
                        </>
                        :
                        <>
                            <Col style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                flexWrap: "wrap",
                                marginLeft: "10%"
                            }}
                                 span={20}>
                                <ShopItems cart={cart}
                                           favorite={favorite}
                                           setCart={setCart}
                                           setFavorite={setFavorite}
                                           cards={cards}
                                           navigation={navigation}
                                />
                            </Col>
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
                            </Space>
                        </>
                }
            </Space>
            {!loading ? <Footer/> : <div/>}
        </>
    );
};

export default InventoryPage;