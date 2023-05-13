import { Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import {
    Center,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Box,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';

export default function Profile() {
    const { isLoading, data, error } = useQuery({
        queryKey: ['me'],
        queryFn: () => axios.get('/me').then((res) => res.data),
    });

    return (
        <Page>
            <Container maxW={'container.sm'} p={{ base: 5, md: 10 }}>
                <Stack spacing={4}>
                    {error ? (
                        <VStack
                            color="white"
                            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        >
                            <TextBox value={data.me?.email} />
                            <TextBox value={data.me?.phone} />
                            <TextBox value={data.me?.studentNumber} />
                            <TextBox value={data.me?.registrationNumber} />
                        </VStack>
                    ) : null}
                </Stack>
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
