import React, { useState } from 'react';
import { Button, Modal as ModalWrapper } from 'antd';

interface ModalProps {
    title: string;
    handleOk: () => void;
    handleCancel: () => void;
    open: boolean;
}

const Modal: React.FC<ModalProps> = ({
    handleCancel,
    handleOk,
    open,
    title,
}) => {
    const [isOpen, _] = useState(open);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    // const handleOk = () => {
    //     setModalText('The modal will be closed after two seconds');
    //     setConfirmLoading(true);
    //     setTimeout(() => {
    //         setOpen(false);
    //         setConfirmLoading(false);
    //     }, 2000);
    // };

    // const handleCancel = () => {
    //     console.log('Clicked cancel button');
    //     setOpen(false);
    // };

    return (
        <>
            <ModalWrapper
                title="Title"
                open={isOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </ModalWrapper>
        </>
    );
};

export default Modal;
