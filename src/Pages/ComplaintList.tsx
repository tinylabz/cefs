import { Page } from '@/components/Page';
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
type Action = 'Process Complaint' | 'Resolve' | 'Resolved';

export default function ComplaintList() {
    const [activeBtn, setActiveBtn] = useState<Btn>('submitted');
    const [action, setAction] = useState<Action>('Process Complaint');

    const handleTabSelect = (btn: Btn) => {
        if (btn === 'submitted') setAction('Process Complaint');
        if (btn === 'resolved') setAction('Resolved');
        if (btn === 'pending') setAction('Resolve');

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
                                _hover={{
                                    color: 'white',
                                    bg: 'whatsapp.700',
                                }}
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
                                _hover={{
                                    color: 'white',
                                    bg: 'whatsapp.700',
                                }}
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
                                _hover={{
                                    color: 'white',
                                    bg: 'whatsapp.700',
                                }}
                            >
                                Resolved
                            </Button>
                        </ButtonGroup>
                    </Center>
                    <TableContainer>
                        <Table size="md">
                            <Thead>
                                <Tr>
                                    <Th>Reg No.</Th>
                                    <Th>Course Name</Th>
                                    <Th>Nature</Th>
                                    <Th>Time</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <Tr key={idx.toString()}>
                                        <Td>19/U/0123</Td>
                                        <Td>Computer literacy</Td>
                                        <Td>Missing Mark</Td>
                                        <Td>2:31pm</Td>
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
