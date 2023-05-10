import { ButtonGroup, Container } from '@chakra-ui/react';

import { Page } from '@/components/Page';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/state';
import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
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

    const { handleSubmit, register } = useForm();

    return (
        <Page>
            <Container maxW={'container.sm'} p={{ base: 5, md: 10 }}>
                <VStack
                    as="form"
                    onSubmit={handleSubmit((data) => JSON.stringify(data))}
                    boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                    h="max-content !important"
                    rounded="lg"
                >
                    <Text textAlign={'center'} fontSize={'4xl'}>
                        Change Password
                    </Text>
                    <VStack w="100%">
                        <InputGroup size="md" id="oldPassword">
                            <Input
                                rounded="md"
                                {...register('oldPassword')}
                                placeholder="Old Password"
                                type={showOldPassword ? 'text' : 'password'}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    size="xs"
                                    onClick={() =>
                                        setShowOldPassword(!showOldPassword)
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
                                {...register('confirmPassword')}
                                placeholder="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
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
                            border={'1px'}
                            type="submit"
                            rounded="md"
                            w="100%"
                        >
                            Close
                        </Button>
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
                    </ButtonGroup>
                </VStack>
            </Container>
        </Page>
    );
}
