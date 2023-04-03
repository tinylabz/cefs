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
  VStack,
  Text,
  useColorModeValue,
  Divider,
  Box
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [data, setData] = useState("")
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm()

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="4xl" color="green.700" css={{ letterSpacing: "1rem" }} >CEFS</Heading>
            <Heading fontSize="2xl" color="green.700" >Login</Heading>
          </Stack>
          <VStack
            as="form"
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
          >
            <VStack spacing={4} w="100%">
              <Input rounded="md" {...register("studentNumber")} placeholder='Student Number' type="text" />
              <InputGroup size="md">
                <Input rounded="md" {...register("password")} placeholder='Password' type={show ? 'text' : 'password'} />
                <InputRightElement width="4.5rem">
                  <Button
                    size="xs"
                    onClick={handleClick}
                  >
                    {show ? <BsEyeSlash /> : <BsEyeFill />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" p={'5px 5px'} justify="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
              </Stack>
              <Button
                bg="green.700"
                color="white"
                _hover={{
                  bg: 'green.900'
                }}
                type="submit"
                rounded="md"
                w="100%"
              >
                Continue
              </Button>
              <Text fontSize={{ base: 'md', sm: 'md' }}>Don't have an account?</Text>
              <Box onClick={() => navigate("/register")} css={{ cursor: "pointer" }} fontSize={{ base: 'md', sm: 'md' }} color="green" >
                <Text>Register</Text>
              </Box>
            </VStack>
            <p>DATA: {data}</p>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};
