import { Button, Container, Text } from '@chakra-ui/react';

import React, { useState } from 'react';
import { Modal as ModalWrapper } from 'antd';
import { Page } from '@/components/Page';
import { Stack } from '@chakra-ui/react';
import { MissingMark, Remark, WrongAcademicYear } from '@/components/Forms';

interface Complaint {
    title: string;
    form: React.ReactNode;
}

interface ModalProps {
    title: string;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ children, title }) => {
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

const Complaints = ({}) => {
    const complaints: Complaint[] = [
        { title: 'Missing Mark', form: <MissingMark /> },
        { title: 'Remark', form: <Remark /> },
        {
            title: 'Wrong Academic Year',
            form: <WrongAcademicYear />,
        },
    ];

    return (
        <Page>
            <Container p={{ base: 5, md: 1 }}>
                <Stack>
                    <Text align={'center'} mt="1em" mb="1em" fontSize={'4xl'}>
                        Select Nature of Complaint
                    </Text>

                    <Stack>
                        {complaints.map(({ title, form }) => {
                            return (
                                <Modal key={title} title={title}>
                                    {form}
                                </Modal>
                            );
                        })}
                    </Stack>
                </Stack>
            </Container>
        </Page>
    );
};

export default Complaints;
