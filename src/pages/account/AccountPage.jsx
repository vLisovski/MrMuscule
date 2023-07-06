import React, {useState} from 'react';
import {Col, Row} from "antd";
import AccountPagesMenu from "../../components/account/accountpagesmenu/AccountPagesMenu";
import {Routes, Route} from "react-router-dom";
import UserDataPage from "./userdata/UserDataPage";
import FavoritePage from "./favorite/FavoritePage";
import PurchasesPage from "./purchases/PurchasesPage";
import ReturnsPage from "./returns/ReturnsPage";
import BonusesPage from "./bonuses/BonusesPage";
import AuthPage from "../authpage/AuthPage";

const AccountPage = () => {
    let [isAuth, setAuth] = useState(true)
    return (
        <>
            {
                isAuth
                    ?
                <Row justify="start">
                    <Col span={4}>
                        <AccountPagesMenu/>
                    </Col>
                    <Routes>
                        <Route path="/info" element={<UserDataPage/>}/>
                        <Route path="/favorite" element={<FavoritePage/>}/>
                        <Route path="/purchases" element={<PurchasesPage/>}/>
                        <Route path="/returns" element={<ReturnsPage/>}/>
                        <Route path="/bonuses" element={<BonusesPage/>}/>
                    </Routes>
                </Row>
                    :
                <AuthPage/>
            }
        </>
    );
};

export default AccountPage;