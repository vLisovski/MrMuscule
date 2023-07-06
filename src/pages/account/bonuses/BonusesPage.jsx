import React from 'react';
import {Col} from "antd";

import BonusBalance from "../../../components/account/bonusbalance/BonusBalance";

const BonusesPage = () => {

    let balance = 500

    return (
        <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}
             span={20}
        >
            <BonusBalance balance={balance}/>
        </Col>
    );
};

export default BonusesPage;