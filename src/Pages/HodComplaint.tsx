// @ts-nocheck
import { Page } from '@/components/Page';
import { useQuery } from '@tanstack/react-query';

import { axios } from '@/config/axios-config';
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
    Spinner,
} from '@chakra-ui/react';

import TimeAgo from 'timeago-react';
import { useState, useEffect } from 'react';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';

export default function HodComplaint() {
    const [activeBtn, setActiveBtn] = useState<Btn>('SUBMITTED');

    const { isLoading, data, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });
    const [complaints, setComplaints] = useState<any[]>(data?.complaints);

    useEffect(() => {
        setComplaints(() => {
            return data?.complaints?.filter(
                (complaint: any) => complaint?.status === activeBtn
            );
        });
    }, [activeBtn, data]);

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'SUBMITTED') setActiveBtn('SUBMITTED');

        if (btn === 'RESOLVED') setActiveBtn('RESOLVED');

        if (btn === 'PENDING') setActiveBtn('PENDING');
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
                            >
                                RESOLVED
                            </Button>
                        </ButtonGroup>
                    </Center>
                    <TableContainer>
                        <Table size="md">
                            <Thead>
                                <Tr>
                                    <Th>Std No</Th>
                                    <Th>Reg No.</Th>
                                    <Th>Course Name</Th>
                                    <Th>Course Code</Th>
                                    <Th>Nature of complaint</Th>
                                    <Th>Time</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isLoading ? (
                                    <Center>
                                        <Spinner
                                            style={{ margin: '2em auto' }}
                                        />
                                    </Center>
                                ) : (
                                    complaints
                                        ?.sort(
                                            (a: any, b: any) =>
                                                Date.parse(b?.createdAt) -
                                                Date.parse(a?.createdAt)
                                        )
                                        .map((complaint: any) => (
                                            <Tr key={complaint._id}>
                                                <Td>
                                                    {complaint.studentNumber}
                                                </Td>
                                                <Td>
                                                    {
                                                        complaint.registrationNumber
                                                    }
                                                </Td>
                                                <Td>{complaint.courseName}</Td>
                                                <Td>{complaint.courseCode}</Td>
                                                <Td>{complaint.nature}</Td>
                                                <Td>
                                                    <TimeAgo
                                                        datetime={
                                                            complaint?.createdAt
                                                        }
                                                        locale="en-UG"
                                                    />
                                                </Td>
                                            </Tr>
                                        ))
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </Page>
    );
}
