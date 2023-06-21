import { Container, Text } from '@chakra-ui/react';

import React from 'react';
import { Page } from '@/components/Page';
import { Stack } from '@chakra-ui/react';
import {
    MissingMark,
    Remark,
    WrongAcademicYear,
} from '@/components/ComplaintForms';
import { Modal } from '@/components/Modal';

interface Complaint {
    title: string;
    form: React.ReactNode;
}

const Complaints = () => {
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
