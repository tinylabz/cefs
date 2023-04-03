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
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate()

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
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
          >
            <VStack spacing={4} w="100%">
              <Input rounded="md" placeholder='Student Number' type="text" />
              <FormControl id="password">
                <InputGroup size="md">
                  <Input rounded="md" placeholder='Password' type={show ? 'text' : 'password'} />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="xs"
                      onClick={handleClick}
                    >
                      {show ? <BsEyeSlash /> : <BsEyeFill />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Stack direction='row' h='50px' alignItems="center" justifyContent="center">
                  <Divider orientation='horizontal' />
                  <Text fontWeight="medium">Or</Text>
                  <Divider orientation='horizontal' />
                </Stack>
                <Input rounded="md" placeholder='Email' type="email" />
                <InputGroup size="md" mt="10px">
                  <Input rounded="md" placeholder='Password' type={show ? 'text' : 'password'} />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="xs"
                      onClick={handleClick}
                    >
                      {show ? <BsEyeSlash /> : <BsEyeFill />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
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
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};
