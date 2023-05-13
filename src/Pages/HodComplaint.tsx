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
} from '@chakra-ui/react';

import { useState } from 'react';

type Btn = 'submitted' | 'pending' | 'resolved';

export default function HodComplaint() {
    const [activeBtn, setActiveBtn] = useState<Btn>('submitted');
    const { isLoading, data, error } = useQuery({
        queryKey: ['complaints'],
        queryFn: () => axios.get('/complaints').then((res) => res.data),
    });

    const handleTabSelect = (btn: Btn) => {
        setActiveBtn(btn);
    };

    return (
        <Page>
            <Container maxW="100%">
                <Stack spacing={4}>
                    <Center>
                        <ButtonGroup spacing="none" w={'container.sm'}>
                            <Button
                                onClick={() => handleTabSelect('submitted')}
                                //@ts-ignore
                                bg={activeBtn === 'submitted' && 'whatsapp.700'}
                                //@ts-ignore
                                color={
                                    activeBtn === 'submitted' &&
                                    'whiteAlpha.900'
                                }
                                rounded="none"
                                border={'1px'}
                                borderColor="gray.300"
                                w="100%"
                            >
                                Submitted
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('pending')}
                                //@ts-ignore
                                bg={activeBtn === 'pending' && 'whatsapp.700'}
                                //@ts-ignore
                                color={
                                    activeBtn === 'pending' && 'whiteAlpha.900'
                                }
                                rounded="none"
                                border={'1px'}
                                borderColor="gray.300"
                                w="100%"
                            >
                                Pending
                            </Button>
                            <Button
                                onClick={() => handleTabSelect('resolved')}
                                //@ts-ignore
                                bg={activeBtn === 'resolved' && 'whatsapp.700'}
                                //@ts-ignore
                                color={
                                    activeBtn === 'resolved' && 'whiteAlpha.900'
                                }
                                rounded="none"
                                border={'1px'}
                                borderColor="gray.300"
                                w="100%"
                            >
                                Resolved
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
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.complaints?.map((complaint: any) => (
                                    <Tr key={complaint._id}>
                                        <Td>{complaint.studentNumber}</Td>
                                        <Td>{complaint.registrationNumber}</Td>
                                        <Td>{complaint.courseName}</Td>
                                        <Td>{complaint.courseCode}</Td>
                                        <Td>{complaint.nature}</Td>
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
