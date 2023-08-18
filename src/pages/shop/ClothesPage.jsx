import React, {useEffect, useState} from 'react';
import Footer from "../../components/footer/Footer";
import {Col, Dropdown, Pagination, Space} from "antd";
import ShopPageApi from "../../api/shop/ShopPageApi";
import {DownOutlined} from "@ant-design/icons";
import ShopItems from "../../components/shop/ShopItems";

const ClothesPage = () => {
    let shopPageApi = new ShopPageApi()

    let [cards, setCards] = useState([])
    let [limit, setLimit] = useState(6)
    let [offset, setOffset] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)
    let [total, setTotal] = useState(0)

    useEffect(() => {
        shopPageApi.getTotalClothes().then(response => {
            setTotal(response.data)
            console.log(total)
        }).catch(
            error => {
                alert(error)
            }
        )
        shopPageApi.getAllClothes(limit, offset).then(response => {
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

    const onChange = (page) => {
        setCurrentPage(page)
        setOffset(limit*(page-1))
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
                <Col style={{display: "flex", flexDirection: "row",justifyContent: "start", flexWrap: "wrap" , marginLeft: "10%"}}
                     span={20}>
                    <ShopItems cards={cards}/>
                </Col>
            </Space>
            <Space style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "30px"}}>
                <Pagination onChange={onChange}
                            defaultCurrent={1}
                            defaultPageSize={1}
                            total={total}
                            pageSize={limit}
                            current={currentPage}/>
            </Space>
            <Footer/>
        </>
    );
};

export default ClothesPage;