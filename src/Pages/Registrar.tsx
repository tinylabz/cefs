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
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import { Complaint } from '@/types';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';
type Action = 'VIEW' | 'RESOLVE' | 'RESOLVED';

export default function RegistrarPage() {
    const [activeTab, setActiveTab] = useState<Btn>('SUBMITTED');
    const [action, setAction] = useState<Action>('VIEW');

    const { data, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });
    const [complaints, setComplaints] = useState<any[]>(data?.complaints);

    useEffect(() => {
        setComplaints(() => {
            return data?.complaints?.filter(
                (complaint: Complaint) =>
                    complaint?.status === activeTab &&
                    Number(complaint.registrationNumber.split('/')[0]) <= 17
            );
        });
    }, [activeTab, data]);

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'SUBMITTED') setAction('VIEW');

        if (btn === 'RESOLVED') setAction('RESOLVED');

        if (btn === 'PENDING') setAction('RESOLVE');

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
                                    <Th>Std No.</Th>
                                    <Th>Reg No.</Th>
                                    <Th>Status</Th>
                                    <Th>Course Name</Th>
                                    <Th>Nature</Th>
                                    <Th>Date</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {complaints
                                    ?.sort(
                                        (a: any, b: any) =>
                                            Date.parse(b?.createdAt) -
                                            Date.parse(a?.createdAt)
                                    )
                                    .map((complaint: any, idx: number) => (
                                        <Tr key={idx.toString()}>
                                            <Td>{complaint.studentNumber}</Td>
                                            <Td>
                                                {complaint.registrationNumber}
                                            </Td>
                                            <Td>{complaint.status}</Td>
                                            <Td>{complaint.courseName}</Td>
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
                                                <Button
                                                    bg={'whatsapp.700'}
                                                    color="white"
                                                    _hover={{
                                                        color: 'white',
                                                        bg: 'whatsapp.700',
                                                    }}
                                                >
                                                    {action}
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </Page>
    );
}
