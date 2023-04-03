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
  Divider
} from '@chakra-ui/react';

import { useState } from 'react';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="4xl" css={{ letterSpacing: "1rem" }} >CEFS</Heading>
            <Heading fontSize="2xl" >Login</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
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
                  <Text fontWeight="medium" >Or</Text>
                  <Divider orientation='horizontal' />
                </Stack>
                <Input rounded="md" placeholder='Registration Number' type="text" />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justify="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
              >
                Continue
              </Button>
              <Text fontSize={{ base: 'md', sm: 'md' }}>Don't have an account?</Text>
              <Link href='/register' fontSize={{ base: 'md', sm: 'md' }} color="green" >Register</Link>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};
