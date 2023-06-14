import { axios } from '@/config/axios-config';
import {
    Box,
    Button,
    Center,
    Spinner,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User, useStore } from '@/state';
import { AxiosError, AxiosResponse } from 'axios';
import { HiHome, HiMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { BsMailbox } from 'react-icons/bs';

export const ResendEmail = () => {
    const toast = useToast();
    const { token, setUser } = useStore();

    useQuery({
        queryKey: [''],
        queryFn: () =>
            axios.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),

        onSuccess: (res) => {
            const user = res?.data?.me as User;

            const verifiedUser: User = {
                _id: user?._id!,
                designation: user?.designation!,
                email: user?.email!,
                isEmailVerified: user?.isEmailVerified!,
                name: user?.name!,
                college: user?.college!,
                registrationNumber: user?.registrationNumber!,
                school: user?.school!,
                studentNumber: user?.studentNumber!,
            };
            setUser(verifiedUser);
        },
    });

    const mutation = useMutation({
        mutationFn: () =>
            axios.get('/mail/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: (res: AxiosResponse) => {
            console.log('RES:=>', res.data);
            toast({
                title: JSON.stringify(res.data),
                status: 'success',
                isClosable: true,
                position: 'top',
            });
        },
        onError: (error: AxiosError) => {
            toast({
                title: error.response?.data as unknown as string,
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        },
    });

    const { isLoading } = mutation;

    return (
        <Center alignItems="center" h="100vh">
            <VStack rounded="sm" p="1em" border={'2px solid #38A169'} w="md">
                <HiMail size="3em" color="#38A169" />
                <Text mb="1em" fontSize="2xl">
                    Didn't recieve the email ?
                </Text>
                <Button
                    onClick={() => mutation.mutate()}
                    colorScheme="green"
                    my="2"
                    w="full"
                >
                    {isLoading ? (
                        <>
                            {' '}
                            <Spinner size="sm" /> Sending...{' '}
                        </>
                    ) : (
                        'Resend verification link'
                    )}
                </Button>

                <Link to="/signin" style={{ width: '100%' }}>
                    <Button w="full" leftIcon={<HiHome />}>
                        Back home
                    </Button>
                </Link>
            </VStack>
        </Center>
    );
};
