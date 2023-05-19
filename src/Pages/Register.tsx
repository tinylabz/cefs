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
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Select,
} from '@chakra-ui/react';

import { useState } from 'react';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Logo } from '@/components/Logo';
import { axios } from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useStore } from '@/state';

export default function Register() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { setUser } = useStore();
    const qc = useQueryClient();
    const toast = useToast();
    const studentMutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/students/register', JSON.parse(data)),
        onSuccess: (res: AxiosResponse) => {
            qc.invalidateQueries({ queryKey: ['user'] });
            setUser(res?.data?.user);
            toast({
                title: 'Successfully registered',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            axios
                .get('/mail/', {
                    headers: {
                        Authorization: `Bearer ${res?.data?.token}`,
                    },
                })
                .then((res) =>
                    toast({
                        title: JSON.stringify(res.data),
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    })
                )
                .catch((error: AxiosError) => {
                    toast({
                        title: JSON.stringify(error.response?.data),
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
            navigate('/');
        },
        onError: (error: AxiosError) => {
            toast({
                title: JSON.stringify(error?.response?.data),
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    const staffMutation = useMutation({
        mutationFn: (data: string) =>
            axios.post('/staff/register', JSON.parse(data)),
        onSuccess: (res) => {
            setUser(res?.data?.user);

            qc.invalidateQueries({ queryKey: ['user'] });

            axios
                .get('/mail/', {
                    headers: {
                        Authorization: `Bearer ${res?.data?.token}`,
                    },
                })
                .then((res) =>
                    toast({
                        title: JSON.stringify(res.data),
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    })
                )
                .catch((error: AxiosError) => {
                    toast({
                        title: JSON.stringify(error.response?.data),
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
            navigate('/');
        },
        onError: (error: AxiosError) => {
            toast({
                title: JSON.stringify(error.response?.data),
                status: 'error',
                isClosable: true,
                position: 'top',
            });
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
                                    bg={useColorModeValue('white', 'gray.100')}
                                >
                                    <Input
                                        rounded="md"
                                        {...register('name')}
                                        placeholder="Name"
                                    />
                                    <Input
                                        rounded="md"
                                        {...register('studentNumber')}
                                        placeholder="Student Number"
                                    />
                                    <Input
                                        rounded="md"
                                        {...register('registrationNumber')}
                                        placeholder="Registration Number"
                                    />
                                    <Input
                                        rounded="md"
                                        {...register('email')}
                                        placeholder="Email Address"
                                        type="email"
                                    />
                                    <InputGroup>
                                        <InputLeftAddon children="+256" />
                                        <Input
                                            type="tel"
                                            {...register('phone')}
                                            placeholder="Phone"
                                        />
                                    </InputGroup>
                                    <Input
                                        rounded="md"
                                        {...register('college')}
                                        placeholder="College e.g. College of Computing and Information..."
                                    />
                                    <InputGroup size="md">
                                        <Input
                                            rounded="md"
                                            {...register('password')}
                                            placeholder="Password"
                                            type={show ? 'text' : 'password'}
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

                                    <VStack w="100%">
                                        <Button
                                            colorScheme="green"
                                            color="white"
                                            type="submit"
                                            rounded="md"
                                            w="100%"
                                        >
                                            {studentMutation.isLoading ? (
                                                <Spinner />
                                            ) : (
                                                'Register'
                                            )}
                                        </Button>
                                        <Text
                                            fontSize={{ base: 'md', sm: 'md' }}
                                        >
                                            Already have an Account?
                                        </Text>
                                        <Box
                                            onClick={() => navigate('/signin')}
                                            css={{ cursor: 'pointer' }}
                                            fontSize={{ base: 'md', sm: 'md' }}
                                            color="green"
                                        >
                                            Signin
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
                                    bg={useColorModeValue('white', 'gray.100')}
                                >
                                    <Input
                                        rounded="md"
                                        {...register('name')}
                                        placeholder="Name"
                                    />

                                    <Input
                                        rounded="md"
                                        {...register('email')}
                                        placeholder="Email Address"
                                        type="email"
                                    />
                                    <Input
                                        rounded="md"
                                        {...register('college')}
                                        placeholder="College e.g. College of Computing and Information..."
                                    />
                                    <Input
                                        rounded="md"
                                        {...register('school')}
                                        placeholder="School e.g. School of Computing and Information..."
                                    />
                                    <Select
                                        {...register('designation')}
                                        placeholder="Designation"
                                    >
                                        <option value="HOD">HOD</option>
                                        <option value="LECTURER">
                                            Lecturer
                                        </option>
                                        <option value="REGISTRAR">
                                            Registrar
                                        </option>
                                    </Select>
                                    <InputGroup size="md">
                                        <Input
                                            rounded="md"
                                            {...register('password')}
                                            placeholder="Password"
                                            type={show ? 'text' : 'password'}
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

                                    <VStack w="100%">
                                        <Button
                                            colorScheme="green"
                                            color="white"
                                            type="submit"
                                            rounded="md"
                                            w="100%"
                                        >
                                            {staffMutation.isLoading ? (
                                                <Spinner />
                                            ) : (
                                                'Register'
                                            )}
                                        </Button>
                                        <Text
                                            fontSize={{ base: 'md', sm: 'md' }}
                                        >
                                            Already have an Account?
                                        </Text>
                                        <Box
                                            onClick={() => navigate('/signin')}
                                            css={{ cursor: 'pointer' }}
                                            fontSize={{ base: 'md', sm: 'md' }}
                                            color="green"
                                        >
                                            Signin
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
