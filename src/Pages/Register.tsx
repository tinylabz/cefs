import {
    Button,
    Center,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Icon,
    VStack,
    Text,
    useColorModeValue,
    Divider,
    InputLeftAddon,
    Box,
} from '@chakra-ui/react';

import { useState } from 'react';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Logo } from '@/components/Logo';
import { useStore } from '@/state';

export default function Register() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { setUser } = useStore();

    const handleRegister = (data: string) => {
        console.log('data: ', data);
        setData(data);
        setUser(JSON.parse(data));
        navigate('/');
    };

    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack spacing={4}>
                    <Stack align="center">
                        <Icon as={Logo} h={8} w={8} />
                        <Heading
                            fontSize="4xl"
                            css={{ letterSpacing: '1rem' }}
                            color={'green.700'}
                        >
                            CEFS
                        </Heading>
                        <Heading fontSize="2xl" color={'green.700'}>
                            Register Here
                        </Heading>
                    </Stack>
                    <VStack
                        as="form"
                        onSubmit={handleSubmit((data) =>
                            handleRegister(JSON.stringify(data))
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
                                {...register('stdNo')}
                                placeholder="Student Number"
                                type="text"
                            />
                            <Input
                                rounded="md"
                                {...register('regNo')}
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
                                bg="green.700"
                                color="white"
                                _hover={{
                                    bg: 'green.900',
                                }}
                                type="submit"
                                rounded="md"
                                w="100%"
                            >
                                Register
                            </Button>
                            <Text fontSize={{ base: 'md', sm: 'md' }}>
                                Already have an Account?
                            </Text>
                            <Box
                                onClick={() => navigate('/login')}
                                css={{ cursor: 'pointer' }}
                                fontSize={{ base: 'md', sm: 'md' }}
                                color="green.700"
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
