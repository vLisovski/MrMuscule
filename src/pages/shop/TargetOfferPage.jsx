import React, {useEffect, useState} from 'react';
import CartApi from "../../api/cart/CartApi";
import UsersApiWorker from "../../api/user/UsersApiWorker";
import ShopPageApi from "../../api/shop/ShopPageApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";
import {Alert, Col, Dropdown, Pagination, Space, Spin, Radio, Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import ShopItems from "../../components/shop/ShopItems";
import Footer from "../../components/footer/Footer";

const TargetOfferPage = (props) => {

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

    let [gender, setGender] = useState("male")
    let [type, setType] = useState("cardio")
    let [isWinter, setIsWinter] = useState(false)

    let [favorite, setFavorite] = useState([])
    let navigation = useNavigate()

    const getProductsByTag = () => {

        let winter

        if (isWinter) {
            winter = "winter"
        } else {
            winter = ""
        }

        let tag1

        if (type === "pump") {
            tag1 = type + "," + gender
        } else {
            tag1 = type + "," + gender
        }

        if (winter === "winter") {
            tag1 = tag1 + "," + winter
        }

        let tag2 = type

        console.log("TAG1 " + tag1)
        console.log("TAG2 " + tag2)

        shopPageApi.getTotalByTag(tag1, tag2).then(response => {
            console.log("TOTAL" + response.data)
            setTotal(response.data)
            if (localStorageWorker.get("token") != null && localStorageWorker.get("userid") != null) {
                userApi.getFavoritesIds(localStorageWorker.get("userid"), response.data, 0, localStorageWorker.get("token"))
                    .then(response => {
                        setFavorite(response.data)
                    }).catch(() => {
                        setFavorite([])
                        setLoading(false)
                    }
                )
                cartApi.getProductIds(localStorageWorker.get("userid"), localStorageWorker.get("token"))
                    .then(response => {
                        props.setCart(response.data)
                        console.log("CART" + props.cart)
                        localStorageWorker.save("cart", props.cart)
                        setLoading(false)
                    })
                    .catch(error => {
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

        shopPageApi.getAllByTag(tag1, tag2, limit, offset).then(response => {
            setCards(response.data)
            setLoading(false)
        }).catch(
            error => {
                alert(error)
            }
        )
    }

    useEffect(() => {
        props.setCurrent("target")
    }, [])

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

    const itemsType = [
        {
            label: "Кардио",
            key: 'cardio'
        },
        {
            label: "Набор массы",
            key: 'pump'
        }
    ];

    const itemsGender = [
        {
            label: "Мужской",
            key: 'male'
        },
        {
            label: "Женский",
            key: 'female'
        }
    ];

    const onClick = ({key}) => {
        setLimit(key)
    };

    const onClickGender = ({key}) => {
        setGender(key)
    };

    const onClickType = ({key}) => {
        setType(key)
        console.log(key)
    };

    const onChange = (page) => {
        setCurrentPage(page)
        setOffset(limit * (page - 1))
    }

    useEffect(() => {
        getProductsByTag()
    }, [limit, offset])

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
                    <Dropdown destroyPopupOnHide={true} menu={{
                        items: items,
                        onClick: onClick
                    }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Товаров на странице
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>

                    <Dropdown menu={{
                        items: itemsType,
                        onClick: onClickType
                    }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Тип тренировки
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>

                    <Dropdown destroyPopupOnHide={true} menu={{
                        items: itemsGender,
                        onClick: onClickGender
                    }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Пол
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>

                    {
                        type === "cardio"
                            ?
                            <Radio checked={isWinter} onClick={() => {
                                isWinter ? setIsWinter(false) : setIsWinter(true)
                            }}>Зима</Radio>
                            :
                            <></>
                    }
                    <Button onClick={getProductsByTag}>Найти товары</Button>
                </Space>

                <Space style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "start",
                    alignItems: "stretch",
                    marginLeft: "5%"
                }}>
                    {
                        type==="cardio" ? <a>Выбранный тип тренировки: кардио</a> : <a>Выбранный тип тренировки: набор мышечной массы</a>
                    }
                    {
                        gender==="male" ? <a>Выбранный пол: мужской</a> : <a>Выбранный пол: женский</a>
                    }
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
                                        message="Грузим товары"
                                        description="Скорость загрузки зависит от Вашей сети"
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

export default TargetOfferPage;