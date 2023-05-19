import { Logo } from '@/components/Logo';
import { axios } from '@/config/axios-config';
import { User, useStore } from '@/state';
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
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function Signin() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const { setUser } = useStore();
    const qc = useQueryClient();
    const toast = useToast();

    const studentMutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/students/signin', JSON.parse(data)),
        onSuccess: (res) => {
            qc.invalidateQueries({ queryKey: ['user'] });
            setUser(res.data as unknown as User);
            navigate('/');
        },
        onError: (error: AxiosError) => {
            toast({
                status: 'error',
                title: JSON.stringify(error?.response?.data),
                position: 'top',
                isClosable: true,
            });
        },
    });

    const staffMutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/staff/signin', JSON.parse(data)),
        onSuccess: (res) => {
            qc.invalidateQueries({ queryKey: ['user'] });
            setUser(res?.data?.user);
            navigate('/');
        },
        onError: (error: AxiosError) => {
            toast({
                status: 'error',
                title: JSON.stringify(error?.response?.data),
                position: 'top',
                isClosable: true,
            });
        },
    });

    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack spacing={4}>
                    <Stack align="center">
                        <Icon as={Logo} h={15} w={15} />

                        <Heading fontSize="4xl" css={{ letterSpacing: '1rem' }}>
                            CEFS
                        </Heading>
                        <Heading fontSize="2xl">LOGIN</Heading>
                    </Stack>

                    <Tabs
                        isFitted
                        variant="solid-rounded"
                        colorScheme={'green'}
                    >
                        <TabList mb="1em">
                            <Tab>Student</Tab>
                            <Tab>Staff</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack
                                    as="form"
                                    onSubmit={handleSubmit((data) =>
                                        studentMutation.mutate(
                                            JSON.stringify(data)
                                        )
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
                                                type={
                                                    show ? 'text' : 'password'
                                                }
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    size="xs"
                                                    onClick={handleClick}
                                                >
                                                    {show ? (
                                                        <BsEyeSlash />
                                                    ) : (
                                                        <BsEyeFill />
                                                    )}
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
                                            <Checkbox
                                                colorScheme="green"
                                                size="md"
                                            >
                                                Remember me
                                            </Checkbox>
                                        </Stack>
                                        <Button
                                            colorScheme={'green'}
                                            color="white"
                                            type="submit"
                                            rounded="md"
                                            w="100%"
                                        >
                                            {studentMutation.isLoading ? (
                                                <Spinner />
                                            ) : (
                                                'Continue as Student'
                                            )}
                                        </Button>
                                        <Text
                                            fontSize={{ base: 'md', sm: 'md' }}
                                        >
                                            Don't have an account?
                                        </Text>
                                        <Box
                                            onClick={() =>
                                                navigate('/register')
                                            }
                                            css={{ cursor: 'pointer' }}
                                            fontSize={{ base: 'md', sm: 'md' }}
                                        >
                                            <Text>Register</Text>
                                        </Box>
                                    </VStack>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack
                                    as="form"
                                    onSubmit={handleSubmit((data) =>
                                        staffMutation.mutate(
                                            JSON.stringify(data)
                                        )
                                    )}
                                    boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                                    h="max-content !important"
                                    bg={useColorModeValue('white', 'gray.700')}
                                    rounded="lg"
                                >
                                    <VStack spacing={4} w="100%">
                                        <Input
                                            rounded="md"
                                            {...register('email')}
                                            placeholder="Staff Email"
                                            type="email"
                                        />
                                        <InputGroup size="md">
                                            <Input
                                                rounded="md"
                                                {...register('password')}
                                                placeholder="Password"
                                                type={
                                                    show ? 'text' : 'password'
                                                }
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    size="xs"
                                                    onClick={handleClick}
                                                >
                                                    {show ? (
                                                        <BsEyeSlash />
                                                    ) : (
                                                        <BsEyeFill />
                                                    )}
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
                                            <Checkbox
                                                colorScheme="green"
                                                size="md"
                                            >
                                                Remember me
                                            </Checkbox>
                                        </Stack>
                                        <Button
                                            colorScheme={'green'}
                                            color="white"
                                            type="submit"
                                            rounded="md"
                                            w="100%"
                                        >
                                            {studentMutation.isLoading ? (
                                                <Spinner />
                                            ) : (
                                                'Continue as Staff'
                                            )}
                                        </Button>
                                        <Text
                                            fontSize={{ base: 'md', sm: 'md' }}
                                        >
                                            Don't have an account?
                                        </Text>
                                        <Box
                                            onClick={() =>
                                                navigate('/register')
                                            }
                                            css={{ cursor: 'pointer' }}
                                            fontSize={{ base: 'md', sm: 'md' }}
                                        >
                                            <Text>Register</Text>
                                        </Box>
                                    </VStack>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </Center>
        </Container>
    );
}
