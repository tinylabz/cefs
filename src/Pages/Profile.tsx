import { Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useStore } from '@/state';
import {
    Center,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Box,
} from '@chakra-ui/react';

export default function Profile() {
    const { user } = useStore();

    return (
        <Page>
            <Container p={{ base: 5, md: 10 }}>
                <Center>
                    <Stack spacing={4}>
                        <VStack
                            color="white"
                            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        >
                            <TextBox value={user?.name} />
                            <TextBox value={user?.email} />
                            <TextBox value={user?.phone} />
                            <TextBox value={user?.stdNo} />
                            <TextBox value={user?.regNo} />
                        </VStack>
                    </Stack>
                </Center>
            </Container>
        </Page>
    );
}

type TextBoxProps = { value?: string; label?: string };

const TextBox: React.FC<TextBoxProps> = ({ value, label }) => {
    return (
        <>
            <Text>{label}</Text>
            <Box
                p={'2'}
                rounded={'md'}
                w="full"
                bg={useColorModeValue('gray.500', 'gray.800')}
            >
                <Text>{value}</Text>
            </Box>
        </>
    );
};
