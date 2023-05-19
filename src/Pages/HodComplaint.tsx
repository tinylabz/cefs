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
import { Complaint } from '@/types';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';

export default function HodComplaint() {
    const [activeTab, setActiveTab] = useState<Btn>('SUBMITTED');

    const { isLoading, data, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });
    const [complaints, setComplaints] = useState<any[]>(data?.complaints);

    useEffect(() => {
        setComplaints(() => {
            return data?.complaints?.filter(
                (complaint: Complaint) => complaint?.status === activeTab
            );
        });
    }, [activeTab, data]);

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'SUBMITTED') setActiveTab('SUBMITTED');

        if (btn === 'RESOLVED') setActiveTab('RESOLVED');

        if (btn === 'PENDING') setActiveTab('PENDING');
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
                                w="100%"
                            >
                                SUBMITTED
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('PENDING')}
                                colorScheme={
                                    activeTab === 'PENDING' ? 'green' : 'gray'
                                }
                                w="100%"
                            >
                                PENDING
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('RESOLVED')}
                                colorScheme={
                                    activeTab === 'RESOLVED' ? 'green' : 'gray'
                                }
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
