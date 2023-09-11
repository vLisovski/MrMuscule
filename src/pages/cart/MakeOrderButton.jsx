import {Button, Col, Input, Modal} from 'antd';
import {useEffect, useState} from 'react';
import React from 'react';
import CartApi from "../../api/cart/CartApi";
import LocalStorageWorker from "../../storage/LocalStorageWorker";
import OrderApi from "../../api/order/OrderApi";
import TextArea from "antd/lib/input/TextArea";

const MakeOrderButton = (props) => {

    const [modalIsOpen, setModalOpen] = useState(false);
    let [inputBonuses, setInputBonuses] = useState(0);
    let [validInputBonuses, setValidInputBonuses] = useState(true);
    let [validInputDescription, setValidInputDescription] = useState(true);
    let [disabled, setDisabled] = useState(false)
    let [description, setDescription] = useState()
    const cartApi = new CartApi()
    const orderApi = new OrderApi()
    const local = new LocalStorageWorker()

    useEffect(() => {
        props.callBackFromDeleteClick()
    })

    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Оформить заказ
            </Button>
            <Modal
                title="Оформление заказа"
                centered
                open={modalIsOpen}
                okButtonProps={{disabled: disabled}}
                onOk={() => {
                    orderApi.makeOrderByUserId(local.get("token"), {
                        cost: props.cost,
                        description: description,
                        bonusesToBuy: inputBonuses,
                        bonusBalance: props.bonusBalance,
                        bonusBoost: props.bonusBoost,
                        userId: local.get("userid"),
                        status: "collecting",
                        productIdsList: [...props.data.map((item)=>{
                            return item.id
                        })]
                    })
                        .then(() => {
                            cartApi.clearCart(local.get("userid"), local.get("token"))
                                .then((response) => {
                                    console.log("CLEAR CART RESPONSE " + response)
                                    local.save("cart", [])
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            setModalOpen(false)
                            props.navigate("/account/orders")
                        })
                        .catch((error) => {
                            setModalOpen(false)
                            alert(error + "Ошибка оформления заказа")
                        })
                }
                }
                onCancel={() => setModalOpen(false)}
                okText="Оформить"
                cancelText="Назад">
                <p>Списать бонусов:</p>
                <p>Текущий баланс бонусов:{props.bonusBalance}</p>
                <br/>
                <small style={{color: "violet"}}>Оплатить бонусами можно не более 10% стоимости заказа</small>
                <Input defaultValue={0} status={validInputBonuses} onChange={event => {
                    if (props.cost * 0.1 < event.target.value || props.bonusBalance < event.target.value) {
                        setValidInputBonuses(false)
                        setDisabled(true)
                    } else {
                        setInputBonuses(event.target.value)
                        setValidInputBonuses(true)
                        setDisabled(false)
                    }
                }} placeholder="Введите сумму"/>
                {validInputBonuses
                    ?
                    <small/>
                    :
                    <Col span={16} offset={6}>
                        <small style={{color: "red"}}>Превышено допустимое значение для списания</small>
                    </Col>
                }
                <TextArea autoSize={{
                    minRows: 2,
                    maxRows: 6,
                }} defaultValue={""} status={validInputDescription} onChange={event => {
                    if (event.target.value.length > 512) {
                        setValidInputDescription(false)
                        setDisabled(true)
                    } else {
                        setDescription(event.target.value)
                        setValidInputDescription(true)
                        setDisabled(false)
                    }
                }} placeholder="Введите описание"/>
                {validInputDescription
                    ?
                    <small/>
                    :
                    <Col span={16} offset={6}>
                        <small style={{color: "red"}}>Превышено допустимое количество символов</small>
                    </Col>
                }
                <p>Стоимость заказа: {props.cost}</p>
                <p style={{color: "green"}}>
                    Стоимость с учетом списания бонусов: {props.cost - inputBonuses}
                </p>
                <p>Бонусов за покупку: {props.buyBonuses}</p>
            </Modal>
        </>
    );
};

export default MakeOrderButton;