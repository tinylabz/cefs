import { ButtonGroup, Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/state';
import {
    Button,
    Center,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    VStack,
    Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

export default function ChangePassword() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState('');
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const { setUser } = useStore();

    return (
        <Page>
            <Container p={{ base: 5, md: 10 }}>
                <Center>
                    <Stack spacing={4}>
                        <Text align={'center'} fontSize={'4xl'}>
                            Change Password
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
                            <VStack w="100%">
                                <InputGroup size="md" id="oldPassword">
                                    <Input
                                        rounded="md"
                                        {...register('oldPassword')}
                                        placeholder="Old Password"
                                        type={
                                            showOldPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            size="xs"
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
                                        >
                                            {showOldPassword ? (
                                                <BsEyeSlash />
                                            ) : (
                                                <BsEyeFill />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup size="md" id="NewPassword">
                                    <Input
                                        rounded="md"
                                        {...register('newPassword')}
                                        placeholder="New Password"
                                        type={
                                            showNewPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            size="xs"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
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
                                        {...register('confirmPassword')}
                                        placeholder="Confirm Password"
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            size="xs"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <BsEyeSlash />
                                            ) : (
                                                <BsEyeFill />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </VStack>
                            <ButtonGroup w="100%" m={'10'}>
                                <Button
                                    bg="transparent"
                                    color="black"
                                    border={'2px solid darkgreen'}
                                    type="submit"
                                    rounded="md"
                                    w="100%"
                                >
                                    Close
                                </Button>
                                <Button
                                    bg="green.500"
                                    color="white"
                                    _hover={{
                                        bg: 'green.900',
                                    }}
                                    type="submit"
                                    rounded="md"
                                    w="100%"
                                >
                                    Submit
                                </Button>
                            </ButtonGroup>
                        </VStack>
                    </Stack>
                </Center>
            </Container>
        </Page>
    );
}
