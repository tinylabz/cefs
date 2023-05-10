import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal as Wrapper } from 'antd';
import { Button, Container, Text } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { MissingMark, Remark } from '@/components/forms';
import { WrongAcademicYear } from '@/components/forms';

interface Complaint {
    title: string;
    form: React.ReactNode;
}

const Complaint = () => {
    const { confirm } = Wrapper;

    const openModal = (title: string, children: React.ReactNode) => {
        confirm({
            title,
            // icon: <ExclamationCircleFilled />,
            icon: null,
            content: children,
            async onOk() {
                try {
                    return await new Promise((resolve, reject) => {
                        setTimeout(
                            Math.random() > 0.5 ? resolve : reject,
                            1000
                        );
                    });
                } catch {
                    return console.log('Oops errors!');
                }
            },
            onCancel() {},
        });
    };

    const complaints: Complaint[] = [
        { title: 'Missing Mark', form: <MissingMark /> },
        { title: 'Remark', form: <Remark /> },
        { title: 'Wrong Academic Year', form: <WrongAcademicYear /> },
    ];

    return (
        <Page>
            <Container p={{ base: 5, md: 1 }}>
                <Stack>
                    <Text align={'center'} mt="1em" mb="1em" fontSize={'4xl'}>
                        Select Nature of Complaint
                    </Text>

                    <Stack>
                        {complaints.map(({ title, form }, idx) => {
                            return (
                                <Button
                                    key={idx.toString()}
                                    onClick={() => openModal(title, form)}
                                >
                                    {title}
                                </Button>
                            );
                        })}
                    </Stack>
                </Stack>
            </Container>
        </Page>
    );
};

export default Complaint;
