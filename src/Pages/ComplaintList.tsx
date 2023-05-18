
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

import { Key, useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';
type Action = 'Process Complaint' | 'RESOLVE' | 'RESOLVED';

export default function ComplaintList() {
    const [activeBtn, setActiveBtn] = useState<Btn>('SUBMITTED');
    const [action, setAction] = useState<Action>('Process Complaint');

    const { isLoading, data, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });
    const [complaints, setComplaints] = useState<any[]>(data?.complaints);

    useEffect(() => {
        setComplaints(() => {
            return data?.complaints?.filter(
                (complaint) => complaint?.status === activeBtn
            );
        });
    }, [activeBtn, data]);

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'SUBMITTED') setAction('Process Complaint');

        if (btn === 'RESOLVED') setAction('RESOLVED');

        if (btn === 'PENDING') setAction('RESOLVE');

        setActiveBtn(btn);
    };

    return (
        <Page>
            <Container maxW="100%">
                <Stack spacing={4}>
                    <Center>
                        <ButtonGroup spacing="none" w={'container.sm'}>
                            <Button
                                onClick={() => handleTabSelect('SUBMITTED')}
                                bg={activeBtn === 'SUBMITTED' && 'whatsapp.700'}
                                color={
                                    activeBtn === 'SUBMITTED' &&
                                    'whiteAlpha.900'
                                }
                                rounded="none"
                                border={'1px'}
                                borderColor="gray.300"
                                w="100%"
                                _hover={{
                                    color: 'white',
                                    bg: 'whatsapp.700',
                                }}
                            >
                                SUBMITTED
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('PENDING')}
                                bg={activeBtn === 'PENDING' && 'whatsapp.700'}
                                color={
                                    activeBtn === 'PENDING' && 'whiteAlpha.900'
                                }
                                rounded="none"
                                border={'1px'}
                                borderColor="gray.300"
                                w="100%"
                                _hover={{
                                    color: 'white',
                                    bg: 'whatsapp.700',
                                }}
                            >
                                PENDING
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('RESOLVED')}
                                bg={activeBtn === 'RESOLVED' && 'whatsapp.700'}
                                color={
                                    activeBtn === 'RESOLVED' && 'whiteAlpha.900'
                                }
                                rounded="none"
                                border={'1px'}
                                borderColor="gray.300"
                                w="100%"
                                _hover={{
                                    color: 'white',
                                    bg: 'whatsapp.700',
                                }}
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
