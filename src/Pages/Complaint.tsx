import { Center, Container, Text } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';

export default function Complaint() {
    const [complaints, setComplaints] = useState([
        'Missing Mark',
        'Remark',
        'Wrong Academic Year',
        'Wrong Course Code',
        '',
    ]);
    const [value, setValue] = useState(complaints[0]);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <Page>
            <Container maxW={'container.lg'} p={{ base: 5, md: 10 }}>
                <Center>
                    <Stack spacing={4}>
                        <Text align={'center'} fontSize={'4xl'}>
                            Select Nature of Complaint
                        </Text>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                {complaints.map((complaint, idx) => {
                                    if (complaints.length - 1 === idx) {
                                        return (
                                            <Radio value={4}>
                                                More...
                                                <Input
                                                    style={{
                                                        width: 100,
                                                        marginLeft: 10,
                                                    }}
                                                />
                                            </Radio>
                                        );
                                    }
                                    return (
                                        <Radio value={complaint}>
                                            {complaint}
                                        </Radio>
                                    );
                                })}
                            </Space>
                        </Radio.Group>
                    </Stack>
                </Center>
            </Container>
        </Page>
    );
}
