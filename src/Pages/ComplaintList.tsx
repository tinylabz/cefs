import { Page } from '@/components/Page';
import { axios } from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import {
    Button,
    ButtonGroup,
    Container,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Center,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Key, useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import { Complaint } from '@/types';
import { useStore } from '@/state';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';
type Action = 'View' | 'Resolve' | 'Resolved';

export default function ComplaintList() {
    const [activeTab, setActiveTab] = useState<Btn>('SUBMITTED');
    const [action, setAction] = useState<Action>('View');
    const { user } = useStore();
    const { isLoading, data, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });
    const [complaints, setComplaints] = useState<any[]>(data?.complaints);

    useEffect(() => {
        setComplaints(() => {
            if (activeTab === 'SUBMITTED')
                return data?.complaints?.filter((complaint: Complaint) => {
                    return complaint.studentId === user?._id;
                });
            return data?.complaints?.filter(
                (complaint: Complaint) =>
                    complaint?.status === activeTab &&
                    complaint.studentId === user?._id
            );
        });
    }, [activeTab, data]);

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'SUBMITTED') setAction('View');

        if (btn === 'RESOLVED') setAction('Resolved');

        if (btn === 'PENDING') setAction('Resolve');

        setActiveTab(btn);
    };

    return (
        <Page>
            <Container maxW="100%">
                <Stack spacing={4}>
                    <Center>
                        <ButtonGroup w={'container.sm'}>
                            <Button
                                onClick={() => handleTabSelect('SUBMITTED')}
                                colorScheme={
                                    activeTab === 'SUBMITTED' ? 'green' : 'gray'
                                }
                                border="none"
                                w="100%"
                            >
                                SUBMITTED
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('PENDING')}
                                colorScheme={
                                    activeTab === 'PENDING' ? 'green' : 'gray'
                                }
                                border="none"
                                w="100%"
                            >
                                PENDING
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('RESOLVED')}
                                colorScheme={
                                    activeTab === 'RESOLVED' ? 'green' : 'gray'
                                }
                                border="none"
                                w="100%"
                            >
                                RESOLVED
                            </Button>
                        </ButtonGroup>
                    </Center>
                    <TableContainer>
                        <Table size="md">
                            <Thead>
                                <Tr>
                                    <Th>Reg No.</Th>
                                    <Th>Status</Th>
                                    <Th>Course Name</Th>
                                    <Th>Course Code</Th>
                                    <Th>Nature</Th>
                                    <Th>Date</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {complaints?.length !== 0 ? (
                                    complaints
                                        ?.sort(
                                            (a: any, b: any) =>
                                                Date.parse(b?.createdAt) -
                                                Date.parse(a?.createdAt)
                                        )
                                        .map((complaint: any, idx: number) => (
                                            <Tr key={idx.toString()}>
                                                <Td>
                                                    {
                                                        complaint.registrationNumber
                                                    }
                                                </Td>
                                                <Td>{complaint.status}</Td>
                                                <Td>{complaint.courseName}</Td>
                                                <Td>{complaint.courseCode}</Td>
                                                <Td>{complaint.nature}</Td>
                                                <Td>
                                                    <TimeAgo
                                                        datetime={
                                                            complaint.createdAt
                                                        }
                                                        locale="en-UG"
                                                    />
                                                </Td>
                                                <Td>
                                                    <Button>{action}</Button>
                                                </Td>
                                            </Tr>
                                        ))
                                ) : (
                                    <Text>No complaints</Text>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </Page>
    );
}
