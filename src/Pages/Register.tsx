import {
    Center,
    Container,
    Heading,
    Stack,
    Icon,
    VStack,
    Text,
    useColorModeValue,
    Box,
    Spinner,
    useToast,
    Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { axios } from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useStore } from '@/state';
import { COLLEGES, DESIGNATIONS, SCHOOLS } from '@/types';

import {
    Tabs,
    TabsProps,
    rem,
    Input,
    Button,
    PasswordInput,
} from '@mantine/core';
import { FiMail } from 'react-icons/fi';

export function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    width: '100%',
                    marginBottom: '1rem',
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.white,
                    color:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[0]
                            : theme.colors.gray[9],
                    border: `${rem(1)} solid ${
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[4]
                    }`,
                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                    cursor: 'pointer',
                    fontSize: theme.fontSizes.lg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',

                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&:not(:first-of-type)': {
                        borderLeft: 0,
                    },

                    '&:first-of-type': {
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                    },

                    '&:last-of-type': {
                        borderTopRightRadius: theme.radius.md,
                        borderBottomRightRadius: theme.radius.md,
                    },

                    '&[data-active]': {
                        backgroundColor: theme.colors.teal[7],
                        borderColor: theme.colors.teal[7],
                        color: theme.white,
                    },
                },

                tabIcon: {
                    marginRight: theme.spacing.xs,
                    display: 'flex',
                    alignItems: 'center',
                },

                tabsList: {
                    display: 'flex',
                },
            })}
            {...props}
        />
    );
}

export default function Register() {
    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack spacing={4}>
                    <Stack align="center">
                        <Icon as={Logo} h={8} w={8} />
                        <Heading
                            fontSize="4xl"
                            css={{ letterSpacing: '1rem' }}
                            color={'green.600'}
                        >
                            CEFS
                        </Heading>
                        <Heading fontSize="2xl" color={'green.600'}>
                            Register Here
                        </Heading>
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

const StaffForm = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [college, setCollege] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { setUser, token, setToken } = useStore();
    const queryClient = useQueryClient();
    const toast = useToast();
    const staffMutation = useMutation({
        mutationFn: (data: {
            name: string;
            email: string;
            school: string;
            college: string;
            designation: string;
            password: string;
        }) =>
            axios.post('/staff/register', {
                name,
                email,
                school,
                college,
                designation,
                password,
            }),
        onSuccess: (res) => {
            setUser(res?.data?.user);
            setToken(res?.data?.token);

            queryClient.invalidateQueries({ queryKey: ['user'] });

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
        <VStack
            as="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                staffMutation.mutate({
                    name,
                    email,
                    school,
                    college,
                    designation,
                    password,
                });
            }}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.100')}
        >
            <Input
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                placeholder="Staff Name"
                w="100%"
            />

            <Input
                w="100%"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Email Address"
                type="email"
                icon={<FiMail />}
            />

            <Select
                w="100%"
                value={college}
                onChange={({ target: { value } }) => setCollege(value)}
                placeholder="Select College"
                style={{ width: '100%' }}
            >
                {Object.values(COLLEGES).map((c) => (
                    <option value={c}>{c}</option>
                ))}
            </Select>
            <Select
                w="100%"
                value={school}
                onChange={({ target: { value } }) => setSchool(value)}
                placeholder="Select School"
                style={{ width: '100%' }}
            >
                {Object.values(SCHOOLS).map((v) => (
                    <option value={v}>{v}</option>
                ))}
            </Select>
            <Select
                w="100%"
                value={designation}
                onChange={({ target: { value } }) => setDesignation(value)}
                placeholder="Designation"
                style={{ width: '100%' }}
            >
                {Object.values(DESIGNATIONS).map((v) => (
                    <option value={v}>{v}</option>
                ))}
            </Select>
            <PasswordInput
                w="100%"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Password"
                label="Password"
            />

            <VStack w="100%">
                <Button type="submit" w="100%">
                    {staffMutation.isLoading ? <Spinner /> : 'Register'}
                </Button>
                <Text fontSize={{ base: 'md', sm: 'md' }}>
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
    );
};

const StudentForm = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [college, setCollege] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { setUser } = useStore();
    const qc = useQueryClient();
    const toast = useToast();
    const studentMutation = useMutation({
        mutationFn: (data: {
            name: string;
            email: string;
            college: string;
            studentNumber: string;
            registrationNumber: string;
            password: string;
        }) =>
            axios.post('/students/register', {
                name,
                email,
                college,
                studentNumber,
                registrationNumber,
                password,
            }),
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
    return (
        <VStack
            as="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                studentMutation.mutate({
                    college,
                    email,
                    name,
                    password,
                    registrationNumber,
                    studentNumber,
                });
            }}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.100')}
        >
            <Input
                w="100%"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                placeholder="Student Name"
            />
            <Input
                w="100%"
                value={studentNumber}
                onChange={({ target: { value } }) => setStudentNumber(value)}
                placeholder="Student Number"
            />
            <Input
                w="100%"
                value={registrationNumber}
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
                placeholder="Registration Number"
            />
            <Input
                w="100%"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Email Address"
                type="email"
            />

            <Select
                w="100%"
                value={college}
                onChange={({ target: { value } }) => setCollege(value)}
                placeholder="Select College"
                style={{ width: '100%' }}
            >
                {Object.values(COLLEGES).map((c) => (
                    <option value={c}>{c}</option>
                ))}
            </Select>
            <PasswordInput
                w="100%"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Password"
                type={show ? 'text' : 'password'}
            />

            <VStack w="100%">
                <Button type="submit" w="100%">
                    {studentMutation.isLoading ? <Spinner /> : 'Register'}
                </Button>
                <Text fontSize={{ base: 'md', sm: 'md' }}>
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
    );
};
