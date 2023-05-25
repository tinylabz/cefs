import { Page } from '@/components/Page';
import { Container, Stack, Text } from '@chakra-ui/react';

import { Divider, Steps } from 'antd';
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

type Status = 'wait' | 'process' | 'finish' | 'error';

export default function ComplaintStatus() {
    const [submittedStatus, setSubmittedStatus] = useState<Status>();
    const [pendingStatus, setPendingStatus] = useState<Status>();
    const [resolvingStatus, setResolvingStatus] = useState<Status>();
    const [doneStatus, setDoneStatus] = useState<Status>();

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
                                    title: 'Submitted',
                                    status: submittedStatus,
                                    icon: <UserOutlined />,
                                },
                                {
                                    title: 'Pending',
                                    status: pendingStatus,
                                    icon: <SolutionOutlined />,
                                },
                                {
                                    title: 'Being worked on',
                                    status: resolvingStatus,
                                    icon: <LoadingOutlined />,
                                },
                                {
                                    title: 'Rectified',
                                    status: doneStatus,
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
                        <Text>Your complaint is being worked on</Text>
                    </Stack>
                </Stack>
            </Container>
        </Page>
    );
}
