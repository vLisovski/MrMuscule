import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const RedirectPage = () => {
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/inventory")
    }, []);

    return (
        <>
        </>
    );
};

export default RedirectPage;