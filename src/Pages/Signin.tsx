import { Logo } from '@/components/Logo';
import { axios } from '@/config/axios-config';
import { User, useStore } from '@/state';
import {
    Center,
    Checkbox,
    Container,
    Heading,
    Icon,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Box,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StyledTabs } from './Register';
import { Tabs, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import { FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack spacing={4}>
                    <Stack align="center" color="green.600">
                        <Icon as={Logo} h={15} w={15} />

                        <Heading fontSize="4xl" css={{ letterSpacing: '1rem' }}>
                            CEFS
                        </Heading>
                        <Heading fontSize="2xl">LOGIN</Heading>
                    </Stack>
                    <StyledTabs defaultValue="student">
                        <Tabs.List>
                            <Tabs.Tab value="student">Student</Tabs.Tab>
                            <Tabs.Tab value="staff">Staff</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="student">
                            <StudentForm />
                        </Tabs.Panel>
                        <Tabs.Panel value="staff">
                            <StaffForm />
                        </Tabs.Panel>
                    </StyledTabs>
                </Stack>
            </Center>
        </Container>
    );
}

const StudentForm = () => {
    const [studentNumber, setStudentNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { setUser, setToken } = useStore();
    const qc = useQueryClient();
    const toast = useToast();

    const studentMutation = useMutation({
        mutationFn: (data: { studentNumber: string; password: string }) =>
            axios.post('/students/signin', data),
        onSuccess: (res) => {
            qc.invalidateQueries({ queryKey: ['user'] });
            setUser(res.data?.user as unknown as User);
            setToken(res.data?.token);
            navigate('/');
        },
        onError: (error: AxiosError) => {
            toast({
                status: 'error',
                title: error.response?.data as unknown as string,
                position: 'top',
                isClosable: true,
            });
        },
        onMutate: () => {
            console.log('Mutating...');
        },
    });

    return (
        <VStack
            as="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                studentMutation.mutate({ password, studentNumber });
            }}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
        >
            <VStack spacing={4} w="100%">
                <TextInput
                    value={studentNumber}
                    onChange={({ target: { value } }) =>
                        setStudentNumber(value)
                    }
                    placeholder="Student Number"
                    label="Student Number"
                    w="100%"
                />

                <PasswordInput
                    placeholder="Password"
                    label="Password"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    withAsterisk
                    w="100%"
                />
            </VStack>
            <VStack w="100%">
                <Button type="submit" w="100%">
                    {studentMutation.isLoading ? (
                        <Loader size="xs" color="white" />
                    ) : (
                        'Continue as Student'
                    )}
                </Button>
                <Text fontSize={{ base: 'md', sm: 'md' }}>
                    Don't have an account?
                </Text>
                <Link to="/register">Register</Link>
            </VStack>
        </VStack>
    );
};

const StaffForm = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { setUser, setToken } = useStore();
    const qc = useQueryClient();
    const toast = useToast();

    const staffMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            axios.post('/staff/signin', data),
        onSuccess: (res) => {
            qc.invalidateQueries({ queryKey: ['user'] });
            setUser(res?.data?.user);
            setToken(res.data?.token);
            navigate('/');
        },
        onError: (error: AxiosError) => {
            toast({
                status: 'error',
                title: error.response?.data as unknown as string,
                position: 'top',
                isClosable: true,
            });
        },
    });

    return (
        <VStack
            as="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                staffMutation.mutate({
                    email,
                    password,
                });
            }}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
        >
            <VStack spacing={4} w="100%">
                <TextInput
                    type="email"
                    w="100%"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    icon={<FiMail />}
                    placeholder="Your email"
                    label="Your email"
                />
                <PasswordInput
                    placeholder="Password"
                    label="Password"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    withAsterisk
                    w="100%"
                />
            </VStack>
            <VStack mt="2" w="100%">
                <Button type="submit" w="100%">
                    {staffMutation.isLoading ? (
                        <Loader size="xs" color="white" />
                    ) : (
                        'Continue as Staff'
                    )}
                </Button>
                <Text fontSize={{ base: 'md', sm: 'md' }}>
                    Don't have an account?
                </Text>
                <Link to="/register">Register</Link>
            </VStack>
        </VStack>
    );
};
