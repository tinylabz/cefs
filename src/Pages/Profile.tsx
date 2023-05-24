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
import { useStore } from '@/state';

export default function Profile() {
    const { token, user } = useStore();
    console.log('USER:TOKEN ', token);
    const { isLoading, data, error } = useQuery({
        queryKey: ['me'],
        queryFn: () =>
            axios
                .get('/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data),
    });

    let keys;
    if (data) {
        keys = Object.keys(data.me);
    }

    return (
        <Page>
            <Container maxW={'container.sm'} p={{ base: 5, md: 10 }}>
                <Stack spacing={4}>
                    <VStack
                        color="white"
                        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                    >
                        {keys?.map((key) => {
                            return (
                                <Stack
                                    display="grid"
                                    gridTemplateColumns={'1fr 2fr'}
                                    w="full"
                                    justify="center"
                                    alignItems="center"
                                    bg={useColorModeValue('green.600', 'green')}
                                    p={2}
                                >
                                    <Text>{key}</Text>
                                    <Text>{data?.me[key]?.toString()}</Text>
                                </Stack>
                            );
                        })}
                    </VStack>
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
