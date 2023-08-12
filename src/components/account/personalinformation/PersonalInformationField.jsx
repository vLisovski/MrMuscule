import React from 'react';
import {Space} from "antd";

import Avatar from "../../shared/Avatar";
import InfoFields from "./InfoFields";

const PersonalInformationField = (props) => {

    let user = props.user

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
        </Space>
    );
};

export default PersonalInformationField;