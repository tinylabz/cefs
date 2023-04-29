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

export default function HodComplaint() {
    const [activeBtn, setActiveBtn] = useState<Btn>('submitted');

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
                                bg={activeBtn === 'submitted' && 'whatsapp.700'}
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
                                bg={activeBtn === 'pending' && 'whatsapp.700'}
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
                                bg={activeBtn === 'resolved' && 'whatsapp.700'}
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
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <Tr key={idx.toString()}>
                                        <Td>1900700123</Td>
                                        <Td>19/U/0123</Td>
                                        <Td>Automata</Td>
                                        <Td>IDK</Td>
                                        <Td>Remark</Td>
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
