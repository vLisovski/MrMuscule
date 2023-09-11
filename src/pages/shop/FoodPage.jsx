import React, {useEffect, useState} from 'react';
import Footer from "../../components/footer/Footer";
import {Alert, Col, Dropdown, Pagination, Space, Spin} from "antd";
import ShopPageApi from "../../api/shop/ShopPageApi";
import {DownOutlined} from "@ant-design/icons";
import ShopItems from "../../components/shop/ShopItems";
import CartApi from "../../api/cart/CartApi";
import UsersApiWorker from "../../api/user/UsersApiWorker";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";

const FoodPage = (props) => {

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
    let [auth,setAuth] = useState(false)
    let [favorite, setFavorite] = useState([])
    let navigation = useNavigate()

    useEffect(() => {
        localStorageWorker.save("location",window.location.href)
        props.setCurrent("food")
        shopPageApi.getTotalFood().then(response => {
            setTotal(response.data)
            if (localStorageWorker.get("token") != null && localStorageWorker.get("userid") != null) {
                userApi.getFavoritesIds(localStorageWorker.get("userid"), response.data, 0, localStorageWorker.get("token"))
                    .then(response => {
                        setAuth(true)
                        setFavorite(response.data)
                    }).catch(
                    () => {
                        setFavorite([])
                        setLoading(false)
                    }
                )
                cartApi.getProductIds(localStorageWorker.get("userid"),localStorageWorker.get("token"))
                    .then(response=>{
                        props.setCart(response.data)
                        console.log("CART" + props.cart)
                        localStorageWorker.save("cart", props.cart)
                        setLoading(false)
                    })
                    .catch(error=>{
                        console.log(error)
                        props.setCart(localStorageWorker.get("cart").split(","))
                        setLoading(false)
                    })
            }
        }).catch(
            error => {
                alert(error)
            }
        )

        shopPageApi.getAllFood(limit, offset).then(response => {
            setCards(response.data)
            setLoading(false)
        }).catch(
            error => {
                alert(error)
            }
        )
    }, [limit, offset])

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
                                        message="Грузим питание"
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
                                <ShopItems cart={props.cart}
                                           favorite={favorite}
                                           auth={auth}
                                           setCart={props.setCart}
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

export default FoodPage;