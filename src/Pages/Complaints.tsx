import { Modal as Wrapper } from 'antd';
import { Button, Container, Text } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { MissingMark, Remark, WrongAcademicYear } from '@/components/forms';
import { useQuery } from 'react-query';
import { axios } from '@/config/axios-config';

interface Complaint {
    title: string;
    form: React.ReactNode;
}

const Complaints = () => {
    const { confirm } = Wrapper;

    const openModal = (title: string, children: React.ReactNode) => {
        confirm({
            title,
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

export default Complaints;
