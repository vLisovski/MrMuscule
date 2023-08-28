import {Button, Col, Input, Modal} from 'antd';
import {useEffect, useState} from 'react';
import React from 'react';

const ModalButton = (props) => {

    const [modalIsOpen, setModalOpen] = useState(false);
    let [inputBonuses, setInputBonuses] = useState(0);
    let [validInputBonuses, setValidInputBonuses] = useState(false);
    let [disabled, setDisabled] = useState(true)

    useEffect(()=>{
        props.callBackFromDeleteClick()
        console.log("BBal"+props.bonusBalance)
        console.log("C"+props.cost)
        console.log("BBuy"+props.buyBonuses)
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
                    setModalOpen(false)
                    //props.navigate("/")
                }
                }
                onCancel={() => setModalOpen(false)}
                okText="Оформить"
                cancelText="Назад">
                <text>Списать бонусов:</text>
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
                    </Col>}
                <p>Стоимость заказа: {props.cost}</p>
                <p style={{color: "green"}}>
                    Стоимость с учетом списания бонусов: {props.cost - inputBonuses}
                </p>
                <p>Бонусов за покупку: {props.buyBonuses}</p>
            </Modal>
        </>
    );
};

export default ModalButton;