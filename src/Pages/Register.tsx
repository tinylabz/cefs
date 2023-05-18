
import {
    Button,
    Center,
    Container,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Icon,
    VStack,
    Text,
    useColorModeValue,
    InputLeftAddon,
    Box,
    Spinner,
} from '@chakra-ui/react';

import { useState } from 'react';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Logo } from '@/components/Logo';
import { useStore } from '@/state';
import { axios } from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Register() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/students/register', JSON.parse(data)),
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
                        <Icon as={Logo} h={8} w={8} />
                        <Heading
                            fontSize="4xl"
                            css={{ letterSpacing: '1rem' }}
                            color={'whatsapp.700'}
                        >
                            CEFS
                        </Heading>
                        <Heading fontSize="2xl" color={'whatsapp.700'}>
                            Register Here
                        </Heading>
                    </Stack>
                    <VStack
                        as="form"
                        onSubmit={handleSubmit((data) =>
                            mutation.mutate(JSON.stringify(data))
                        )}
                        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        h="max-content !important"
                        bg={useColorModeValue('white', 'gray.100')}
                        rounded="lg"
                        spacing={8}
                    >
                        <VStack spacing={4} w="100%">
                            <Input
                                rounded="md"
                                {...register('name')}
                                placeholder="Student Name"
                                type="text"
                            />
                            <Input
                                rounded="md"
                                {...register('studentNumber')}
                                placeholder="Student Number"
                                type="text"
                            />
                            <Input
                                rounded="md"
                                {...register('registrationNumber')}
                                placeholder="Registration Number"
                                type="text"
                            />
                            <Input
                                rounded="md"
                                {...register('email')}
                                placeholder="Email"
                                type="email"
                            />
                            <InputGroup>
                                <InputLeftAddon children="+256" />
                                <Input
                                    type="tel"
                                    {...register('phone')}
                                    placeholder="phone Number"
                                />
                            </InputGroup>
                            <Input
                                rounded="md"
                                {...register('college')}
                                placeholder="College"
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
                                {mutation.isLoading ? <Spinner /> : 'Register'}
                            </Button>
                            <Text fontSize={{ base: 'md', sm: 'md' }}>
                                Already have an Account?
                            </Text>
                            <Box
                                onClick={() => navigate('/signin')}
                                css={{ cursor: 'pointer' }}
                                fontSize={{ base: 'md', sm: 'md' }}
                                color="whatsapp.700"
                            >
                                Signin
                            </Box>
                        </VStack>
                    </VStack>
                </Stack>
            </Center>
        </Container>
    );
}
