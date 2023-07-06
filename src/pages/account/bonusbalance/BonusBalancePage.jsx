import React from 'react';
import Header from "../../../components/header/Header";
import {Col, Row} from "antd";
import AccountPagesMenu from "../../../components/account/accountpagesmenu/AccountPagesMenu";
import Footer from "../../../components/footer/Footer";
import BonusBalance from "../../../components/account/bonusbalance/BonusBalance";

const BonusBalancePage = () => {

    let balance = 500

    return (

        <>
            <Header/>
            <Row justify="start">
                <Col span={4}
                >
                    <AccountPagesMenu/>
                </Col>
                <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}
                     span={20}
                >
                    <BonusBalance balance={balance}/>
                </Col>
            </Row>
            <Footer/>
        </>
    );
};

export default BonusBalancePage;