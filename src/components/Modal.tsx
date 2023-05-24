import { Button } from '@chakra-ui/react';
import { Modal as ModalWrapper } from 'antd';
import { useState } from 'react';

export interface ModalProps {
    title: string;
    children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ children, title }) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>{title}</Button>
            <ModalWrapper
                open={open}
                title={title}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {children}
            </ModalWrapper>
        </>
    );
};
