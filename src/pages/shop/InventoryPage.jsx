import React, {useEffect, useState} from 'react';

import Footer from "../../components/footer/Footer";
import {Dropdown, Pagination, Space} from "antd";
import ShopPageApi from "../../api/shop/ShopPageApi";
import {DownOutlined} from "@ant-design/icons";
import Inventory from "../../components/shop/Inventory";

const InventoryPage = () => {

    let shopPageApi = new ShopPageApi()

    let [cards, setCards] = useState([])
    let [limit, setLimit] = useState(6)
    let [offset, setOffset] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        shopPageApi.getAllInventory(limit, offset).then(response => {
            setCards(response.data)
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

    const onChange = ({page, pageSize}) => {
        setCurrentPage(page)
        setOffset(limit*currentPage)
    }

    return (
        <>
            <Space style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: "30px"
            }}>
                <div>
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
                    <Pagination onChange={onChange}
                                defaultCurrent={1}
                                total={limit}
                                current={currentPage}/>
                </div>
                <Inventory cards={cards}/>
            </Space>
            <Footer/>
        </>
    );
};

export default InventoryPage;