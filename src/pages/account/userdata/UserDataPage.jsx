import React, {useEffect, useState} from 'react';
import PersonalInformationField from "../../../components/account/personalinformation/PersonalInformationField";
import {Col} from "antd";
import UsersApiWorker from "../../../api/user/UsersApiWorker";
import LocalStorageWorker from "../../../storage/LocalStorageWorker";
import {useNavigate} from "react-router-dom";

const UserDataPage = () => {

    let userApi = new UsersApiWorker()
    let navigate = useNavigate()
    let [loading,setLoading] = useState(true)
    let [user, setUser] = useState({
        phoneNumber: "",
        email: "",
        name: "",
        avatarPath: "",
        bonuses: 0
    })
    let local = new LocalStorageWorker()

    useEffect(() => {
        if (local.get("token") !== null) {
            userApi.getUserInfo(local.get("userid"), local.get("token"))
                .then(response => {
                    setUser(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                    navigate("/authorization")
                    }
                )
        } else {

            setUser({
                phoneNumber: "",
                email: "",
                name: "",
                avatarPath: "",
                bonuses: 0
            })
        }

    }, [])

    return (
        <>
            <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}} span={20}>
                <PersonalInformationField user={user} loading={loading}/>
            </Col>
        </>
    );
};

export default UserDataPage;