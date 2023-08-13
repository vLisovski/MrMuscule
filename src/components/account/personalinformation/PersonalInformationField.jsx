import React from 'react';
import {Button, Space} from "antd";

import Avatar from "../../shared/Avatar";
import InfoFields from "./InfoFields";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";

const PersonalInformationField = (props) => {

    let localStorageWorker = new LocalStorageWorker();
    let user = props.user
    let navigate = useNavigate();

    return (
        <Space direction="vertical"
               size="large"
               style={{display: 'flex',
                   flexDirection: 'row',
                   marginTop: '30px',
                   background: 'white',
                   border: true,
                   borderRadius: '10px'}}>
            <Avatar
                user={user}
                direction={"vertical"}
                size={"middle"}
                align={"baseline"}
                style = {{display: 'block', margin: '10px', flexDirection: "row", alignItems: "center"}}/>
            <InfoFields
                direction={"vertical"}
                size={"large"}
                align={"baseline"}
                user={user}
                style={{display: 'block', margin: '10px', flexDirection: "column", alignItems: "start"}}/>
            <Button type="primary" onClick={()=>{
                localStorageWorker.delete("userid");
                localStorageWorker.delete("token");
                localStorageWorker.save("menu","inventory");
                navigate("/inventory")
            }}>Выйти</Button>
        </Space>
    );
};

export default PersonalInformationField;