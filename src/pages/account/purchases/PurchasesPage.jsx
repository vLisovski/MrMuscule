import React from 'react';
import {Col} from "antd";
import PurchasesField from "../../../components/account/purchases/PurchasesField";

const PurchasesPage = () => {
//test array
    let purchases = [
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Шейкер",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Кроссовки",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Напульсник",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Перчатки",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Протеин",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Протеин",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Протеин",
            description: "Описание"
        },
        {
            imgSrc: "https://tipik.ru/wp-content/uploads/2023/02/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-Discord_009.jpg",
            title: "Протеин",
            description: "Описание"
        }
    ]

    return (
        <Col style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}
             span={20}
        >
            <PurchasesField purchases={purchases}/>
        </Col>
    );
};

export default PurchasesPage;