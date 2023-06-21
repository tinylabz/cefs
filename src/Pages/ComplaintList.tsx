import { Page } from '@/components/Page';
import { axios } from '@/config/axios-config';
import { useMutation, useQuery } from '@tanstack/react-query';
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
    Text,
    Center,
    Spinner,
} from '@chakra-ui/react';

import { Key, useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import { Complaint, DESIGNATIONS } from '@/types';
import { useStore } from '@/state';
import { ComplaintDetail } from '@/components/ComplaintDetail';
import { BsArrowBarLeft, BsDownload, BsFilePdf } from 'react-icons/bs';
import { Flex } from '@mantine/core';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';

export default function ComplaintList() {
    const [activeTab, setActiveTab] = useState<Btn>('SUBMITTED');
    const [action, setAction] = useState('View');
    const [showDetails, setShowDetails] = useState(false);
    const [activeComplaint, setActiveComplaint] = useState<
        Complaint | undefined
    >(undefined);
    const { user, token } = useStore();
    const { data, isLoading } = useQuery({
        queryKey: ['complaints'],
        queryFn: () =>
            axios
                .get('/complaints', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data),
    });
    const [complaints, setComplaints] = useState<any[]>(data);

    useEffect(() => {
        setComplaints(() => {
            if (activeTab === 'SUBMITTED') return data;
            return data?.filter(
                (complaint: Complaint) => complaint?.status === activeTab
            );
        });
    }, [activeTab, data]);

    console.log('COMPS:', data);

    const handleTabSelect = (btn: Btn) => {
        setActiveTab(btn);
    };
    const mutation = useMutation({
        mutationFn: () =>
            axios.get('/report/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    });

    return (
        <Page>
            <Container maxW="100%">
                {showDetails && (
                    <Button
                        w="fit-content"
                        colorScheme="green"
                        onClick={() => setShowDetails(false)}
                        leftIcon={<BsArrowBarLeft />}
                    >
                        Back
                    </Button>
                )}
                {showDetails ? (
                    <ComplaintDetail {...activeComplaint!} />
                ) : (
                    <Stack spacing={4}>
                        {user?.designation === DESIGNATIONS.HOD ? (
                            <Flex justify={'space-between'} align="center">
                                <ButtonGroup w={'container.sm'}>
                                    <Button
                                        onClick={() =>
                                            handleTabSelect('SUBMITTED')
                                        }
                                        colorScheme={
                                            activeTab === 'SUBMITTED'
                                                ? 'green'
                                                : 'gray'
                                        }
                                        border="none"
                                        w="100%"
                                    >
                                        SUBMITTED
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleTabSelect('PENDING')
                                        }
                                        colorScheme={
                                            activeTab === 'PENDING'
                                                ? 'green'
                                                : 'gray'
                                        }
                                        border="none"
                                        w="100%"
                                    >
                                        PENDING
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleTabSelect('RESOLVED')
                                        }
                                        colorScheme={
                                            activeTab === 'RESOLVED'
                                                ? 'green'
                                                : 'gray'
                                        }
                                        border="none"
                                        w="100%"
                                    >
                                        RESOLVED
                                    </Button>
                                </ButtonGroup>
                                {user?.designation === 'HOD' && (
                                    <Button
                                        colorScheme="green"
                                        onClick={() => mutation.mutate()}
                                        leftIcon={<BsFilePdf />}
                                        rightIcon={<BsDownload />}
                                    >
                                        Download full report
                                    </Button>
                                )}
                            </Flex>
                        ) : (
                            <Center>
                                <ButtonGroup w={'container.sm'}>
                                    <Button
                                        onClick={() =>
                                            handleTabSelect('SUBMITTED')
                                        }
                                        colorScheme={
                                            activeTab === 'SUBMITTED'
                                                ? 'green'
                                                : 'gray'
                                        }
                                        border="none"
                                        w="100%"
                                    >
                                        SUBMITTED
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleTabSelect('PENDING')
                                        }
                                        colorScheme={
                                            activeTab === 'PENDING'
                                                ? 'green'
                                                : 'gray'
                                        }
                                        border="none"
                                        w="100%"
                                    >
                                        PENDING
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleTabSelect('RESOLVED')
                                        }
                                        colorScheme={
                                            activeTab === 'RESOLVED'
                                                ? 'green'
                                                : 'gray'
                                        }
                                        border="none"
                                        w="100%"
                                    >
                                        RESOLVED
                                    </Button>
                                </ButtonGroup>
                            </Center>
                        )}
                        {isLoading ? (
                            <Flex
                                align={'center'}
                                justify="center"
                                h="50vh"
                                w="50vw"
                            >
                                <Spinner size={'lg'} />
                            </Flex>
                        ) : (
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
                                                        Date.parse(
                                                            b?.createdAt
                                                        ) -
                                                        Date.parse(a?.createdAt)
                                                )
                                                .map(
                                                    (
                                                        complaint: any,
                                                        idx: number
                                                    ) => (
                                                        <Tr
                                                            key={idx.toString()}
                                                        >
                                                            <Td>
                                                                {
                                                                    complaint.registrationNumber
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    complaint.status
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    complaint.courseName
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    complaint.courseCode
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    complaint.nature
                                                                }
                                                            </Td>
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
                                                                    onClick={() => {
                                                                        setActiveComplaint(
                                                                            complaint
                                                                        );
                                                                        setShowDetails(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    {action}
                                                                </Button>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                )
                                        ) : (
                                            <Text>No complaints</Text>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        )}
                    </Stack>
                )}
            </Container>
        </Page>
    );
}
