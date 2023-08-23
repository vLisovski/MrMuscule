import React, {useEffect, useState} from 'react';
import {Col, Dropdown, Pagination, Skeleton, Space} from "antd";
import PurchasesField from "../../../components/account/purchases/PurchasesField";
import UsersApiWorker from "../../../api/user/UsersApiWorker";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import ShopItems from "../../../components/shop/ShopItems";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import {DownOutlined} from "@ant-design/icons";

const PurchasesPage = () => {

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()
    const [loading, setLoading] = useState(true);
    let [cards, setCards] = useState([])
    let [limit, setLimit] = useState(3)
    let [offset, setOffset] = useState(0)
    let [total, setTotal] = useState(3)
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {

        userApi.getTotalPurchases(local.get("userid"), local.get("token"))
            .then(response => {
                setTotal(response.data)
            })
            .catch(error => console.log(error))

        userApi.getPurchases(local.get("userid"), limit, offset, local.get("token"))
            .then(response => {
                setCards(response.data.purchasesList)
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
                    <PurchasesField
                        cards={cards}
                               loading={loading}
                    />
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
                            <Meta title={'Вы пока ничего не купили'}
                                  description="Здесь появятся Ваши купленные товары, как только Вы их купите.">
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

export default PurchasesPage;