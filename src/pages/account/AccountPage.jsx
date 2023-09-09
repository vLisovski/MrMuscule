import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import AccountPagesMenu from "../../components/account/accountpagesmenu/AccountPagesMenu";
import {Routes, Route, useNavigate} from "react-router-dom";
import UserDataPage from "./userdata/UserDataPage";
import FavoritePage from "./favorite/FavoritePage";
import PurchasesPage from "./purchases/PurchasesPage";
import OrdersPage from "./orders/OrdersPage";
import BonusesPage from "./bonuses/BonusesPage";
import LocalStorageWorker from "../../storage/LocalStorageWorker";

const AccountPage = (props) => {

    let [isAuth, setAuth] = useState(false)
    let localStorageWorker = new LocalStorageWorker();
    let [currentLeft, setCurrentLeft] = useState()
    let navigate = useNavigate();

    useEffect(() => {
        props.setCurrent("account")
        let token = localStorageWorker.get("token");
        let userid = localStorageWorker.get("userid");

        if (token != null && userid != null) {
            setAuth(true);
            localStorageWorker.save("menu","account")
        } else {
            setAuth(false);
            navigate("/authorization")
        }

    }, []);

    return (
        <>
            {
                isAuth
                    ?
                    <Row justify="start">
                        <Col span={4}>
                            <AccountPagesMenu setCurrentLeft={setCurrentLeft} currentLeft={currentLeft}/>
                        </Col>
                        <Routes>
                            <Route path="/info" element={<UserDataPage setCurrentLeft={setCurrentLeft}/>}/>
                            <Route path="/favorite" element={<FavoritePage setCurrentLeft={setCurrentLeft}/>}/>
                            {/*<Route path="/purchases" element={<PurchasesPage setCurrent={props.setCurrent} setCurrentLeft={setCurrentLeft}/>}/>*/}
                            <Route path="/orders" element={<OrdersPage setCurrentLeft={setCurrentLeft}/>}/>
                            <Route path="/bonuses" element={<BonusesPage setCurrentLeft={setCurrentLeft}/>}/>
                        </Routes>
                    </Row>
                    :
                    <p/>
            }
        </>
    );
};

export default AccountPage;