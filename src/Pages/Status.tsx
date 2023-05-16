import { Page } from '@/components/Page';
import { Container, Stack, Text, VStack } from '@chakra-ui/react';

import { Divider, Steps } from 'antd';
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';

export default function ComplaintStatus() {
    return (
        <Page>
            <Container maxW="100%">
                <Stack justifyContent={'space-between'} h="80vh" spacing={4}>
                    <Stack>
                        <Text textAlign={'center'} fontSize={'4xl'}>
                            Status of Complaint
                        </Text>
                        <Steps
                            items={[
                                {
                                    title: 'SUBMITTED',
                                    status: 'finish',
                                    icon: <UserOutlined />,
                                },
                                {
                                    title: 'PENDING',
                                    status: 'finish',
                                    icon: <SolutionOutlined />,
                                },
                                {
                                    title: 'Being worked on',
                                    status: 'process',
                                    icon: <LoadingOutlined />,
                                },
                                {
                                    title: 'Recified',
                                    status: 'wait',
                                    icon: <SmileOutlined />,
                                },
                            ]}
                        />
                    </Stack>
                    <Stack css={{ marginTop: '4rem' }}>
                        <Divider />
                        <Text fontSize={'2xl'}>Notifications</Text>
                        <Text>
                            You have successfully submitted you complaint for
                            review
                        </Text>
                    </Stack>
                </Stack>
            </Container>
        </Page>
    );
}
