import * as React from 'react'

import { Box, Flex, Img, SimpleGrid, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { ChatMonkey, Plumtic } from './Logo'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'

interface TestimonialProps {
  logo: React.ReactNode
  author: string
  role: string
  image: string
  colorScheme: string
  children: React.ReactNode
}

const Testimonial = ( props: TestimonialProps ) => {
  const { logo, children, image, author, role, colorScheme: c } = props
  const accentColor = mode( `${c}.600`, `${c}.400` )
  return (
    <Flex direction="column" rounded={{ md: 'lg' }} bg={mode( 'white', 'gray.700' )} shadow="lg">
      <Flex
        direction="column"
        position="relative"
        mb="4"
        textAlign="center"
        justify="center"
        align="center"
        pt="10"
        pb="6"
        px="10"
      >
        <Box mb="2">{logo}</Box>
        <Box as="blockquote" maxW="340px" mx="auto" my="4">
          <Box
            position="absolute"
            top="6"
            left="5"
            display={{ base: 'none', md: 'inline' }}
            fontSize="3xl"
            color={accentColor}
            opacity={0.2}
          >
            <ImQuotesLeft />
          </Box>
          <Text fontSize="lg">{children}</Text>
          <Box
            position="absolute"
            bottom="-2"
            right="5"
            display={{ base: 'none', md: 'inline' }}
            fontSize="3xl"
            color={accentColor}
            opacity={0.2}
          >
            <ImQuotesRight />
          </Box>
        </Box>
      </Flex>
      <Flex
        direction="column"
        position="relative"
        align="center"
        justify="center"
        color="white"
        px="6"
        pb="8"
      >
        <Box
          position="absolute"
          left="0"
          bottom="0"
          w="full"
          h="full"
          roundedBottom={{ md: 'lg' }}
          overflow="hidden"
          _before={{
            content: `''`,
            display: 'block',
            position: 'absolute',
            bottom: '0',
            left: '-10%',
            width: '120%',
            height: '90%',
            roundedTop: '120%',
            bg: accentColor,
          }}
        />
        <Img
          src={image}
          alt={author}
          rounded="full"
          border="6px solid"
          borderColor={accentColor}
          position="relative"
          mt="-5"
          w="16"
          h="16"
          objectFit="cover"
        />
        <Box position="relative" fontSize="sm" mt="3" textAlign="center">
          <Text as="h3" fontWeight="bold" fontSize="md">
            {author}
          </Text>
          <Text>{role}</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default () => {
  return (
    <Box as="section" bg={mode( 'gray.100', 'gray.800' )} py="12">
      <Box maxW={{ base: 'xl', md: '6xl' }} mx="auto" px={{ md: '8' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
          <Testimonial
            logo={<Plumtic h="6" color="gray.400" />}
            author="Ian Balijawa"
            role="Chief Technology Officer, Plumtic HQ"
            colorScheme="blue"
            image="https://avatars.githubusercontent.com/u/49788350?v=4"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          </Testimonial>
          <Testimonial
            logo={<ChatMonkey h="6" color="gray.400" />}
            author="Ian Balijawa"
            role="Marketing Manager, Chat Monkey"
            colorScheme="pink"
            image="https://avatars.githubusercontent.com/u/49788350?v=4"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          </Testimonial>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
