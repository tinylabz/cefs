import { Page } from '@/components/Page';
import { useMutation, useQuery } from '@tanstack/react-query';

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
    useToast,
} from '@chakra-ui/react';

import TimeAgo from 'timeago-react';
import { useState, useEffect } from 'react';
import { Complaint } from '@/types';
import { BsArrowBarLeft, BsDownload, BsFilePdf } from 'react-icons/bs';
import { useStore } from '@/state';
import { ComplaintDetail } from '@/components/ComplaintDetail';
import { Flex } from '@mantine/core';

type Btn = 'SUBMITTED' | 'PENDING' | 'RESOLVED';

export default function HodComplaint() {
    const [action, setAction] = useState('View');
    const [activeTab, setActiveTab] = useState<Btn>('SUBMITTED');
    const [activeComplaint, setActiveComplaint] = useState<
        Complaint | undefined
    >(undefined);
    const [showDetails, setShowDetails] = useState(false);

    const { isLoading, data } = useQuery({
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

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'SUBMITTED') setActiveTab('SUBMITTED');

        if (btn === 'RESOLVED') setActiveTab('RESOLVED');

        if (btn === 'PENDING') setActiveTab('PENDING');
    };

    const { token } = useStore();
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
                        <Flex justify={'space-between'} align="center">
                            <ButtonGroup w={'container.sm'}>
                                <Button
                                    onClick={() => handleTabSelect('SUBMITTED')}
                                    colorScheme={
                                        activeTab === 'SUBMITTED'
                                            ? 'green'
                                            : 'gray'
                                    }
                                    w="100%"
                                >
                                    SUBMITTED
                                </Button>
                                <Button
                                    onClick={() => handleTabSelect('PENDING')}
                                    colorScheme={
                                        activeTab === 'PENDING'
                                            ? 'green'
                                            : 'gray'
                                    }
                                    w="100%"
                                >
                                    PENDING
                                </Button>
                                <Button
                                    onClick={() => handleTabSelect('RESOLVED')}
                                    colorScheme={
                                        activeTab === 'RESOLVED'
                                            ? 'green'
                                            : 'gray'
                                    }
                                    w="100%"
                                >
                                    RESOLVED
                                </Button>
                            </ButtonGroup>
                            <Button
                                colorScheme={'green'}
                                onClick={() => mutation.mutate()}
                                leftIcon={<BsFilePdf />}
                                rightIcon={<BsDownload />}
                            >
                                Download full report
                            </Button>
                        </Flex>
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
                                            <Th>Std No</Th>
                                            <Th>Reg No.</Th>
                                            <Th>Course Name</Th>
                                            <Th>Course Code</Th>
                                            <Th>Nature of complaint</Th>
                                            <Th>Time</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {isLoading ? (
                                            <Center>
                                                <Spinner
                                                    style={{
                                                        margin: '2em auto',
                                                    }}
                                                />
                                            </Center>
                                        ) : (
                                            complaints
                                                ?.sort(
                                                    (a: any, b: any) =>
                                                        Date.parse(
                                                            b?.createdAt
                                                        ) -
                                                        Date.parse(a?.createdAt)
                                                )
                                                .map((complaint: any) => (
                                                    <Tr key={complaint._id}>
                                                        <Td>
                                                            {
                                                                complaint.studentNumber
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                complaint.registrationNumber
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
                                                            {complaint.nature}
                                                        </Td>
                                                        <Td>
                                                            <TimeAgo
                                                                datetime={
                                                                    complaint?.createdAt
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
                                                ))
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
