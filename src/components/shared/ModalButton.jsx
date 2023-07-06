import {Button, Image, Modal} from 'antd';
import {useState} from 'react';
import React from 'react';

const ModalButton = () => {
    const [modalIsOpen, setModalOpen] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                модал очка
            </Button>
            <Modal
                title="Окно с очень важной информацией"
                centered
                open={modalIsOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                okText="Переспать с ним"
                cancelText="Остаться никем">
                <p>Вы совершили ахуенно много действий</p>
                <Image
                    width={'100%'}
                    src="https://foni.club/uploads/posts/2023-03/1677740962_foni-club-p-piksel-art-billi-kherrington-3.jpg"
                />
            </Modal>
        </>
    );
};

export default ModalButton;