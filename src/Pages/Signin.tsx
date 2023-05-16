// @ts-nocheck
import { Logo } from '@/components/Logo';
import { axios } from '@/config/axios-config';
import { useStore } from '@/state';
import {
    Button,
    Center,
    Checkbox,
    Container,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Box,
    Spinner,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Signin() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();

    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/students/signin', JSON.parse(data)),
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ['user'] });
            console.log(data);
            navigate('/');
        },
    });

    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack spacing={4}>
                    <Stack align="center">
                        <Icon as={Logo} h={15} w={15} />

                        <Heading
                            fontSize="4xl"
                            color="whatsapp.700"
                            css={{ letterSpacing: '1rem' }}
                        >
                            CEFS
                        </Heading>
                        <Heading fontSize="2xl" color="whatsapp.700">
                            LOGIN
                        </Heading>
                    </Stack>
                    <VStack
                        as="form"
                        onSubmit={handleSubmit((data) =>
                            mutation.mutate(JSON.stringify(data))
                        )}
                        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        h="max-content !important"
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded="lg"
                    >
                        <VStack spacing={4} w="100%">
                            <Input
                                rounded="md"
                                {...register('studentNumber')}
                                placeholder="Student Number"
                                type="text"
                            />
                            <InputGroup size="md">
                                <Input
                                    rounded="md"
                                    {...register('password')}
                                    placeholder="Password"
                                    type={show ? 'text' : 'password'}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button size="xs" onClick={handleClick}>
                                        {show ? <BsEyeSlash /> : <BsEyeFill />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </VStack>
                        <VStack w="100%">
                            <Stack
                                direction="row"
                                p={'5px 5px'}
                                justify="space-between"
                                w="100%"
                            >
                                <Checkbox colorScheme="whatsapp.700" size="md">
                                    Remember me
                                </Checkbox>
                            </Stack>
                            <Button
                                bg="whatsapp.700"
                                color="white"
                                _hover={{
                                    bg: 'whatsapp.700',
                                }}
                                type="submit"
                                rounded="md"
                                w="100%"
                            >
                                {mutation.isLoading ? <Spinner /> : 'Continue'}
                            </Button>
                            <Text fontSize={{ base: 'md', sm: 'md' }}>
                                Don't have an account?
                            </Text>
                            <Box
                                onClick={() => navigate('/register')}
                                css={{ cursor: 'pointer' }}
                                fontSize={{ base: 'md', sm: 'md' }}
                                color="whatsapp.700"
                            >
                                <Text>Register</Text>
                            </Box>
                        </VStack>
                    </VStack>
                </Stack>
            </Center>
        </Container>
    );
}
