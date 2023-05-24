import {
    Center,
    Container,
    Button,
    Heading,
    InputGroup,
    InputRightElement,
    Stack,
    Icon,
    VStack,
    Input as PhoneInput,
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
} from '@chakra-ui/react';
import { Select, Input } from 'antd';
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
                    <Tabs
                        isFitted
                        variant="enclosed-colored"
                        colorScheme={'green'}
                    >
                        <TabList mb="1em">
                            <Tab>Student</Tab>
                            <Tab>Staff</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <StudentForm />
                            </TabPanel>

                            <TabPanel>
                                <StaffForm />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
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
                placeholder="Name"
            />

            <Input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Email Address"
                type="email"
            />
            <Input
                value={college}
                onChange={({ target: { value } }) => setCollege(value)}
                placeholder="College e.g. COCIS"
            />
            <Input
                value={school}
                onChange={({ target: { value } }) => setSchool(value)}
                placeholder="School e.g. School of Computing and Information..."
            />
            <Select
                value={designation}
                onChange={(value) => setDesignation(value)}
                placeholder="Designation"
                style={{ width: '100%' }}
            >
                <option value="HOD">HOD</option>
                <option value="LECTURER">Lecturer</option>
                <option value="REGISTRAR">Registrar</option>
            </Select>
            <InputGroup size="md">
                <Input
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                    <Button size="xs" onClick={handleClick}>
                        {show ? <BsEyeSlash /> : <BsEyeFill />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <VStack w="100%">
                <Button
                    colorScheme="green"
                    color="white"
                    type="submit"
                    w="100%"
                >
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
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                placeholder="Name"
            />
            <Input
                value={studentNumber}
                onChange={({ target: { value } }) => setStudentNumber(value)}
                placeholder="Student Number"
            />
            <Input
                value={registrationNumber}
                onChange={({ target: { value } }) =>
                    setRegistrationNumber(value)
                }
                placeholder="Registration Number"
            />
            <Input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Email Address"
                type="email"
            />

            <Input
                value={college}
                onChange={({ target: { value } }) => setCollege(value)}
                placeholder="College e.g. COCIS"
            />
            <InputGroup size="md">
                <Input
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                    <Button size="xs" onClick={handleClick}>
                        {show ? <BsEyeSlash /> : <BsEyeFill />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <VStack w="100%">
                <Button
                    colorScheme="green"
                    color="white"
                    type="submit"
                    w="100%"
                >
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
