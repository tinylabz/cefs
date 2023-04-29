import { Logo } from '@/components/Logo';
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
    Link,
    Stack,
    VStack,
    Text,
    useColorModeValue,
    Divider,
    Box,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const { setUser } = useStore();

    const handleLogin = (data: string) => {
        setData(data);
        setUser(JSON.parse(data));
        console.log(data);
        navigate('/');
    };

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
                            handleLogin(JSON.stringify(data))
                        )}
                        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        h="max-content !important"
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded="lg"
                    >
                        <VStack spacing={4} w="100%">
                            <Input
                                rounded="md"
                                {...register('stdNo')}
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
                                Continue
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
