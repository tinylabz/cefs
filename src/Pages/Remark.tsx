import { Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { useStore } from '@/state';
import {
    Button,
    Center,
    Checkbox,
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
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

export default function MissingMark() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const { setUser } = useStore();

    const { user } = useStore();
    useEffect(() => {
        if (!user && process.env.NODE_ENV !== 'development') {
            navigate('/login');
        }
    }, []);
    return (
        <Page>
            <Container p={{ base: 5, md: 10 }}>
                <Center>
                    <Stack spacing={4}>
                        <Text align={'center'} fontSize={'4xl'}>
                            Please Fill In This Form!
                        </Text>
                        <VStack
                            as="form"
                            onSubmit={handleSubmit((data) =>
                                JSON.stringify(data)
                            )}
                            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                            h="max-content !important"
                            rounded="lg"
                        >
                            <VStack spacing={4} w="100%">
                                <Input
                                    rounded="md"
                                    {...register('studentNumber')}
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
                                    {...register('courseCode')}
                                    placeholder="Course Code"
                                    type="text"
                                />
                                <Input
                                    rounded="md"
                                    {...register('courseName')}
                                    placeholder="Course Name"
                                    type="text"
                                />
                                <Input
                                    rounded="md"
                                    {...register('academicYearOfSitting')}
                                    placeholder="Academic Year Of Sitting"
                                    type="text"
                                />
                                <Input
                                    rounded="md"
                                    {...register('Semester')}
                                    placeholder="semester"
                                    type="text"
                                />
                                <Input
                                    rounded="md"
                                    {...register('courseLecturer')}
                                    placeholder="Course Lecturer"
                                    type="text"
                                />
                                <Input
                                    rounded={'md'}
                                    {...register('reciept')}
                                    type="file"
                                />
                            </VStack>

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
                                Submit
                            </Button>
                        </VStack>
                    </Stack>
                </Center>
            </Container>
        </Page>
    );
}
