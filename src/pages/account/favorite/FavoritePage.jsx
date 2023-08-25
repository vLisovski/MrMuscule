import React, {useEffect, useState} from 'react';
import {Col, Dropdown, Pagination, Skeleton, Space} from "antd";
import UsersApiWorker from "../../../api/user/UsersApiWorker";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {DownOutlined} from "@ant-design/icons";
import ShopItems from "../../../components/shop/ShopItems";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import {useNavigate} from "react-router-dom";

const FavoritePage = () => {

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()
    const [loading, setLoading] = useState(true);
    let [cards, setCards] = useState([])
    let [limit, setLimit] = useState(3)
    let [offset, setOffset] = useState(0)
    let [total, setTotal] = useState(3)
    let [currentPage, setCurrentPage] = useState(1)
    let [cart, setCart] = useState(local.get("cart"))
    let [favorite, setFavorite] = useState([,])
    let navigate = useNavigate()
    useEffect(() => {

        userApi.getTotalFavorites(local.get("userid"), local.get("token"))
            .then(response => {
                setTotal(response)
            })
            .catch(error => {
                console.log(error)
                local.save("location", window.location.href)
                navigate("/authorization")

            })

        userApi.getFavoritesIds(local.get("userid"), total, 0, local.get("token"))
            .then(response => setFavorite(response.data))
            .catch(error => console.log(error))

        userApi.getFavorites(local.get("userid"), limit, offset, local.get("token"))
            .then(response => {
                setCards(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))

    }, [limit, offset])

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

    return (
        <Space style={{display: "flex", flexDirection: "column", flexWrap: "nowrap", justifyContent: "center"}}>
            <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}
                 span={24}
            >
                {cards.length !== 0 && !loading
                    ?
                    <ShopItems cart={cart}
                               loading={loading}
                               favorite={favorite}
                               setCart={setCart}
                               setFavorite={setFavorite}
                               cards={cards}/>
                    :
                    <Card style={{background: 'white',
                        marginTop: '30px' ,
                        marginLeft: '8px',
                        marginRight: '8px',
                        width: "500px",
                        height: "180px"}}
                          size={"default"}
                          bordered={true}
                          hoverable={false}>
                        <Skeleton loading={loading}>
                        <Meta title={'В избранном нет товаров'}
                              description="Здесь появятся Ваши избранные товары, как только Вы их добавите.">
                        </Meta>
                        </Skeleton>
                    </Card>
                }

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
        </Space>
    );
};

export default FavoritePage;