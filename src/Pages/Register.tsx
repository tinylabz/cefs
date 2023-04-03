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
  InputLeftAddon,
  Box
} from '@chakra-ui/react';

import { useState } from 'react';
import { BsEye, BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate()

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="6xl" color={"green.700"}>CEFS</Heading>
            <Heading fontSize="2xl" color={"green.700"}>Register Here</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.100')}
            rounded="lg"
            spacing={8}

          >
            <VStack spacing={4} w="100%">
              <Input rounded="md" placeholder='Student Name' type="text" />
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
            </VStack>
            <VStack w="100%">
              <Button
                bg="green.700"
                color="white"
                _hover={{
                  bg: 'green.900'
                }}
                rounded="md"
                w="100%"
              >
                Register
              </Button>
              <Text fontSize={{ base: 'md', sm: 'md' }}>Already have an Account?</Text>
              <Box onClick={() => navigate("/login")} css={{ cursor: "pointer" }} fontSize={{ base: 'md', sm: 'md' }} color="green.700" >Signin</Box>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};
