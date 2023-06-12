import { Container, useToast } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Stack,
    Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axios } from '@/config/axios-config';
import { AxiosError, AxiosResponse } from 'axios';
import { useStore } from '@/state';

export default function ChangePassword() {
    const { handleSubmit, register } = useForm();
    const { user, token } = useStore();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const qc = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (data: string) =>
            axios.patch('/change-password', JSON.parse(data), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: (res: AxiosResponse) => {
            qc.invalidateQueries({
                queryKey: ['user'],
            });
            toast({
                title: res.data as string,
                isClosable: true,
                position: 'top',
                status: 'success',
            });
        },
        onError: (error: AxiosError) => {
            toast({
                title: error.response?.data as string,
                position: 'top',
                status: 'error',
                isClosable: true,
            });
        },
    });

    return (
        <Page>
            <Container maxW={'container.sm'} p={{ base: 5, md: 10 }}>
                <VStack
                    as="form"
                    onSubmit={handleSubmit((data) =>
                        mutation.mutate(JSON.stringify(data))
                    )}
                    boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                    h="max-content !important"
                    rounded="lg"
                >
                    <Text textAlign={'center'} fontSize={'4xl'}>
                        Change Password
                    </Text>
                    <VStack w="100%">
                        <InputGroup size="md" id="NewPassword">
                            <Input
                                rounded="md"
                                {...register('newPassword')}
                                placeholder="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    size="xs"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                >
                                    {showNewPassword ? (
                                        <BsEyeSlash />
                                    ) : (
                                        <BsEyeFill />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size="md" id="ConfirmPassword">
                            <Input
                                rounded="md"
                                {...register('confirmNewPassword')}
                                placeholder="Confirm Password"
                                type={
                                    showConfirmNewPassword ? 'text' : 'password'
                                }
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    size="xs"
                                    onClick={() =>
                                        setShowConfirmNewPassword(
                                            !showConfirmNewPassword
                                        )
                                    }
                                >
                                    {showConfirmNewPassword ? (
                                        <BsEyeSlash />
                                    ) : (
                                        <BsEyeFill />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>
                    <Stack w="100%" m={'10'}>
                        <Button
                            colorScheme="green"
                            color="white"
                            type="submit"
                            rounded="md"
                            w="100%"
                        >
                            Change
                        </Button>
                    </Stack>
                </VStack>
            </Container>
        </Page>
    );
}
