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
  InputLeftAddon
} from '@chakra-ui/react';

import { useState } from 'react';
import { BsEye, BsEyeFill, BsEyeSlash } from 'react-icons/bs';

export default function Register() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="6xl">CEFS</Heading>
            <Heading fontSize="2xl">Register Here</Heading>
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
              <Input rounded="md" placeholder='Name' type="text" />
              <Input rounded="md" placeholder='Student No' type="text" />
              <Input rounded="md" placeholder='Reg No' type="text" />
              <Input rounded="md" placeholder='Email' type="email" />
              <InputGroup>
                <InputLeftAddon children='+256' />
                <Input type='tel' placeholder='phone number' />
              </InputGroup>
              <Input rounded="md" placeholder='College' type="text" />
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
              <InputGroup size="md">
                <Input rounded="md" placeholder='Confirm Password' type={show ? 'text' : 'password'} />
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
              <Stack direction="row" justify="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Agree to our Terms of service and Privacy policy
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
              <Text fontSize={{ base: 'md', sm: 'md' }}>Already have an Account?</Text>
              <Link href="/login" fontSize={{ base: 'md', sm: 'md' }} color="green" >Signin</Link>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};
