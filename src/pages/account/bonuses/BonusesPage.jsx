import React, {useEffect, useState} from 'react';
import {Col} from "antd";

import BonusBalance from "../../../components/account/bonusbalance/BonusBalance";
import UsersApiWorker from "../../../api/user/UsersApiWorker";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";

const BonusesPage = (props) => {

    let userApi = new UsersApiWorker()
    let local = new LocalStorageWorker()
    let navigate = useNavigate()

    let [balance, setBalance] = useState(0)

    useEffect(()=>{
        props.setCurrentLeft("bonuses")
        userApi.getBonusBalance(local.get("userid"),local.get("token"))
            .then(response => {
                local.save("location",window.location.href)
                setBalance(response.data)
            })
            .catch(error => {
                local.save("location",window.location.href)
                navigate("/authorization")
                console.log(error)
            })
    },[])

    return (
        <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}
             span={20}
        >
            <BonusBalance balance={balance}/>
        </Col>
    );
};

export default BonusesPage;