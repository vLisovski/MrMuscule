import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import AccountPagesMenu from "../../components/account/accountpagesmenu/AccountPagesMenu";
import {Routes, Route, useNavigate} from "react-router-dom";
import UserDataPage from "./userdata/UserDataPage";
import FavoritePage from "./favorite/FavoritePage";
import PurchasesPage from "./purchases/PurchasesPage";
import ReturnsPage from "./returns/ReturnsPage";
import BonusesPage from "./bonuses/BonusesPage";
import LocalStorageWorker from "../../storage/LocalStorageWorker";

const AccountPage = () => {
    let [isAuth, setAuth] = useState(false)
    let localStorageWorker = new LocalStorageWorker();
    let navigate = useNavigate();
    useEffect(() => {
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
                    :<p/>
            }
        </>
    );
};

export default AccountPage;