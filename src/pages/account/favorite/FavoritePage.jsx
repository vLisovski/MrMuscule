import React, {useEffect, useState} from 'react';
import {Col, Dropdown, Pagination, Space} from "antd";
import UsersApiWorker from "../../../api/user/UsersApiWorker";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {DownOutlined} from "@ant-design/icons";
import ShopItems from "../../../components/shop/ShopItems";

const FavoritePage = () => {

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()

    let [cards, setCards] = useState([])
    let [limit, setLimit] = useState(3)
    let [offset, setOffset] = useState(0)
    let [total, setTotal] = useState(3)
    let [currentPage, setCurrentPage] = useState(1)
    let [cart, setCart] = useState(local.get("cart"))
    let [favorite, setFavorite] = useState([])

    useEffect(() => {

        userApi.getTotalFavorites(local.get("userid"), local.get("token"))
            .then(response => {
                setTotal(response.data)
            })
            .catch(error => console.log(error))

        userApi.getFavoritesIds(local.get("userid"), total, 0, local.get("token"))
            .then(response => setFavorite(response.data))
            .catch(error => console.log(error))

        userApi.getFavorites(local.get("userid"), limit, offset, local.get("token"))
            .then(response => setCards(response.data))
            .catch(error => console.log(error))

        console.log(favorite)

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
                <ShopItems cart={cart}
                           favorite={favorite}
                           setCart={setCart}
                           setFavorite={setFavorite}
                           cards={cards}/>
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